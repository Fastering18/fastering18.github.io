import { JWT, OAuth2Client } from "google-auth-library";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { getConfig } from "@/app/actions/config";
import {
  createOAuth2Client,
  DRIVE_SCOPE,
  getOAuthClientCredentials,
  hasDriveScope,
} from "@/lib/drive/oauth";

export type DriveAuthMode = "oauth" | "service_account" | "none";

type ServiceAccountJson = {
  client_email?: string;
  private_key?: string;
  project_id?: string;
  type?: string;
  [key: string]: unknown;
};

export const CONFIG_REFRESH_TOKEN_KEY = "google_drive_refresh_token";
export const CONFIG_OAUTH_EMAIL_KEY = "google_drive_oauth_email";
export const CONFIG_OAUTH_SCOPES_KEY = "google_drive_oauth_scopes";

/** Vercel/dotenv often stores JSON with real newlines inside private_key. */
export function parseServiceAccountJson(raw: string): ServiceAccountJson | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const attempts: string[] = [trimmed];

  let inString = false;
  let escaped = "";
  for (let i = 0; i < trimmed.length; i++) {
    const c = trimmed[i];
    const prev = trimmed[i - 1];
    if (c === '"' && prev !== "\\") inString = !inString;
    if (inString && c === "\n") escaped += "\\n";
    else if (inString && c === "\r") {
      /* drop */
    } else escaped += c;
  }
  attempts.push(escaped);

  try {
    const once = JSON.parse(trimmed);
    if (typeof once === "string") attempts.push(once);
  } catch {
    /* ignore */
  }

  for (const candidate of attempts) {
    try {
      const obj = JSON.parse(candidate) as ServiceAccountJson;
      if (obj?.client_email && obj?.private_key) {
        return {
          ...obj,
          private_key: String(obj.private_key).replace(/\\n/g, "\n"),
        };
      }
    } catch {
      /* next */
    }
  }

  try {
    return parseServiceAccountJson(Buffer.from(trimmed, "base64").toString("utf8"));
  } catch {
    return null;
  }
}

function loadServiceAccountFromEnv(): ServiceAccountJson | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (raw) {
    const parsed = parseServiceAccountJson(raw);
    if (parsed) return parsed;
  }

  if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    return {
      type: "service_account",
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      project_id: process.env.GOOGLE_PROJECT_ID || "",
    };
  }

  const localPath =
    process.env.GOOGLE_SERVICE_ACCOUNT_PATH ||
    join(process.cwd(), ".private", "blackerz-416717-60247203b699.json");
  if (existsSync(localPath)) {
    return parseServiceAccountJson(readFileSync(localPath, "utf8"));
  }

  return null;
}

export async function getStoredRefreshToken(): Promise<string | null> {
  const fromEnv =
    process.env.GOOGLE_REFRESH_TOKEN ||
    process.env.GOOGLE_OAUTH_REFRESH_TOKEN ||
    "";
  if (fromEnv.trim()) return fromEnv.trim();

  try {
    const cfg = await getConfig();
    const token = cfg[CONFIG_REFRESH_TOKEN_KEY];
    return token?.trim() || null;
  } catch {
    return null;
  }
}

export async function getStoredOAuthEmail(): Promise<string | null> {
  try {
    const cfg = await getConfig();
    return cfg[CONFIG_OAUTH_EMAIL_KEY] || null;
  } catch {
    return null;
  }
}

export async function getStoredOAuthScopes(): Promise<string | null> {
  try {
    const cfg = await getConfig();
    return cfg[CONFIG_OAUTH_SCOPES_KEY] || null;
  } catch {
    return null;
  }
}

export async function getDriveAuthStatus() {
  const sa = loadServiceAccountFromEnv();
  const { clientId, clientSecret } = getOAuthClientCredentials();
  const hasOAuthClient = !!(clientId && clientSecret);
  const refreshToken = await getStoredRefreshToken();
  const oauthEmail = await getStoredOAuthEmail();
  const oauthScopes = await getStoredOAuthScopes();
  const folderId = (process.env.GOOGLE_DRIVE_FOLDER_ID || "").trim();

  const oauthHasDrive = !refreshToken || hasDriveScope(oauthScopes) || !oauthScopes;
  // If scopes unknown (old connect), assume maybe ok but flag reconnect if list fails
  const hasOAuth = hasOAuthClient && !!refreshToken;
  const oauthUsable = hasOAuth && (hasDriveScope(oauthScopes) || !oauthScopes);
  const canWrite = hasOAuth && (hasDriveScope(oauthScopes) || !oauthScopes);
  const canRead = oauthUsable || !!sa?.client_email;
  const ready = !!(folderId && canRead);

  const missing: string[] = [];
  if (!folderId) missing.push("GOOGLE_DRIVE_FOLDER_ID");
  if (!hasOAuthClient) {
    missing.push("GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET");
  }
  if (hasOAuthClient && !refreshToken) {
    missing.push("Connect Google Drive (OAuth) for upload + your storage quota");
  }
  if (hasOAuth && oauthScopes && !hasDriveScope(oauthScopes)) {
    missing.push(
      "Reconnect Google Drive: current token lacks Drive scope (Disconnect → Connect again)"
    );
  }

  return {
    serviceAccount: !!sa?.client_email,
    serviceAccountEmail: sa?.client_email || null,
    oauthClient: hasOAuthClient,
    oauthRefreshToken: !!refreshToken,
    oauthEmail,
    oauthScopes,
    oauthHasDrive: hasOAuth ? hasDriveScope(oauthScopes) || !oauthScopes : false,
    folderIdConfigured: !!folderId,
    folderId: folderId || null,
    canRead,
    canWrite: !!canWrite && (!oauthScopes || hasDriveScope(oauthScopes)),
    ready,
    mode: (oauthUsable
      ? "oauth"
      : sa?.client_email
        ? "service_account"
        : "none") as DriveAuthMode,
    missing,
    notes: [
      "If you see insufficient scopes: Disconnect, then Connect Google Drive again and accept Drive permission.",
      "In Google Cloud → OAuth consent screen → Data access, add scope: https://www.googleapis.com/auth/drive",
      "Folder must live in the same Google account you connect.",
    ],
  };
}

export async function getAccessToken(options?: {
  requireWrite?: boolean;
}): Promise<{
  token: string;
  folderId: string;
  mode: DriveAuthMode;
}> {
  const folderId = (process.env.GOOGLE_DRIVE_FOLDER_ID || "").trim();
  if (!folderId) {
    throw new Error("GOOGLE_DRIVE_FOLDER_ID is not set");
  }

  const requireWrite = options?.requireWrite === true;
  const refreshToken = await getStoredRefreshToken();
  const oauthScopes = await getStoredOAuthScopes();
  const { clientId, clientSecret } = getOAuthClientCredentials();

  const oauthScopesOk = !oauthScopes || hasDriveScope(oauthScopes);

  // Prefer OAuth when token has Drive access
  if (clientId && clientSecret && refreshToken && oauthScopesOk) {
    const oauth = createOAuth2Client();
    oauth.setCredentials({
      refresh_token: refreshToken,
      scope: oauthScopes || DRIVE_SCOPE,
    });
    try {
      const { token } = await oauth.getAccessToken();
      if (!token) throw new Error("Failed to obtain OAuth access token");
      return { token, folderId, mode: "oauth" };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (requireWrite || !loadServiceAccountFromEnv()) {
        throw new Error(
          `OAuth token refresh failed (${msg}). Disconnect Google Drive and Connect again.`
        );
      }
      // fall through to SA read
    }
  }

  if (requireWrite) {
    if (refreshToken && oauthScopes && !hasDriveScope(oauthScopes)) {
      throw new Error(
        "OAuth token is missing Drive permission. Click Disconnect, then Connect Google Drive again and allow Google Drive access."
      );
    }
    throw new Error(
      "Uploads need OAuth with Drive scope. Open Admin CDN → Connect Google Drive and accept Drive access."
    );
  }

  // Read-only fallback: service account
  const sa = loadServiceAccountFromEnv();
  if (sa?.client_email && sa?.private_key) {
    const client = new JWT({
      email: sa.client_email,
      key: sa.private_key.replace(/\\n/g, "\n"),
      scopes: [
        "https://www.googleapis.com/auth/drive.readonly",
        "https://www.googleapis.com/auth/drive",
      ],
    });
    const { token } = await client.getAccessToken();
    if (!token) throw new Error("Failed to obtain service account access token");
    return { token, folderId, mode: "service_account" };
  }

  throw new Error(
    "No usable Google Drive credentials. Connect Google Drive in Admin CDN."
  );
}
