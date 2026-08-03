import { JWT, OAuth2Client } from "google-auth-library";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { getConfig } from "@/app/actions/config";
import {
  createOAuth2Client,
  getOAuthClientCredentials,
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

/**
 * Prefer OAuth (user account quota) for everything.
 * Service accounts have no My Drive storage quota on consumer Google accounts,
 * so uploads as the SA always 403 even when the folder is shared.
 */
export async function getDriveAuthStatus() {
  const sa = loadServiceAccountFromEnv();
  const { clientId, clientSecret } = getOAuthClientCredentials();
  const hasOAuthClient = !!(clientId && clientSecret);
  const refreshToken = await getStoredRefreshToken();
  const oauthEmail = await getStoredOAuthEmail();
  const folderId = (process.env.GOOGLE_DRIVE_FOLDER_ID || "").trim();

  const hasOAuth = hasOAuthClient && !!refreshToken;
  const canRead = hasOAuth || !!sa?.client_email;
  const canWrite = hasOAuth; // SA cannot own storage on personal Gmail Drive
  const ready = !!(folderId && canRead);

  const missing: string[] = [];
  if (!folderId) missing.push("GOOGLE_DRIVE_FOLDER_ID");
  if (!hasOAuthClient) {
    missing.push("GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET (for upload/edit)");
  }
  if (hasOAuthClient && !refreshToken) {
    missing.push(
      "Connect Google account in Admin CDN (OAuth) so uploads use your Drive quota"
    );
  }
  if (!canRead) {
    missing.push("OAuth connect or service account for reading files");
  }

  return {
    serviceAccount: !!sa?.client_email,
    serviceAccountEmail: sa?.client_email || null,
    oauthClient: hasOAuthClient,
    oauthRefreshToken: !!refreshToken,
    oauthEmail,
    folderIdConfigured: !!folderId,
    folderId: folderId || null,
    canRead,
    canWrite,
    ready,
    mode: (hasOAuth
      ? "oauth"
      : sa?.client_email
        ? "service_account"
        : "none") as DriveAuthMode,
    missing,
    notes: [
      "Service accounts have 0 storage on personal Google accounts. Uploads must use OAuth as your Gmail (e.g. blackerzdiscord@gmail.com).",
      "Click Connect Google Drive below once. Redirect URI must be allowed in Google Cloud OAuth client.",
      "Folder ID must be a folder in that same Google account.",
    ],
  };
}

export async function getAccessToken(options?: {
  /** Prefer write-capable OAuth; required for upload/rename/delete */
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
  const { clientId, clientSecret } = getOAuthClientCredentials();

  // Prefer OAuth (user quota) whenever available
  if (clientId && clientSecret && refreshToken) {
    const oauth = new OAuth2Client(clientId, clientSecret);
    oauth.setCredentials({ refresh_token: refreshToken });
    const { token } = await oauth.getAccessToken();
    if (!token) throw new Error("Failed to obtain OAuth access token");
    return { token, folderId, mode: "oauth" };
  }

  if (requireWrite) {
    throw new Error(
      "Uploads need OAuth as your Google account (service accounts have no Drive storage quota). Open Admin CDN and click Connect Google Drive."
    );
  }

  // Read-only fallback: service account (folder must be shared with SA)
  const sa = loadServiceAccountFromEnv();
  if (sa?.client_email && sa?.private_key) {
    const client = new JWT({
      email: sa.client_email,
      key: sa.private_key.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
    const { token } = await client.getAccessToken();
    if (!token) throw new Error("Failed to obtain service account access token");
    return { token, folderId, mode: "service_account" };
  }

  throw new Error(
    "No Google Drive credentials. Connect Google Drive in Admin CDN, or set service account for read-only."
  );
}
