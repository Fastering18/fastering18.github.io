import { JWT, OAuth2Client } from "google-auth-library";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export type DriveAuthMode = "service_account" | "oauth" | "none";

type ServiceAccountJson = {
  client_email?: string;
  private_key?: string;
  project_id?: string;
  type?: string;
  [key: string]: unknown;
};

/** Vercel/dotenv often stores JSON with real newlines inside private_key. */
export function parseServiceAccountJson(raw: string): ServiceAccountJson | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const attempts: string[] = [trimmed];

  // Escape raw newlines/carriage returns that appear inside JSON strings
  let inString = false;
  let escaped = "";
  for (let i = 0; i < trimmed.length; i++) {
    const c = trimmed[i];
    const prev = trimmed[i - 1];
    if (c === '"' && prev !== "\\") inString = !inString;
    if (inString && c === "\n") {
      escaped += "\\n";
    } else if (inString && c === "\r") {
      // drop CR
    } else {
      escaped += c;
    }
  }
  attempts.push(escaped);

  // Double-encoded JSON string
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
      /* try next */
    }
  }

  // Base64 of JSON
  try {
    const decoded = Buffer.from(trimmed, "base64").toString("utf8");
    return parseServiceAccountJson(decoded);
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

const DRIVE_SCOPES = [
  // Full drive scope so SA can upload/rename/delete in a shared folder
  "https://www.googleapis.com/auth/drive",
];

export function getDriveAuthStatus() {
  const sa = loadServiceAccountFromEnv();
  const hasOAuthClient =
    !!(process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_OAUTH_CLIENT_ID) &&
    !!(
      process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_OAUTH_CLIENT_SECRET
    );
  const hasRefresh = !!(
    process.env.GOOGLE_REFRESH_TOKEN || process.env.GOOGLE_OAUTH_REFRESH_TOKEN
  );
  const folderId = (process.env.GOOGLE_DRIVE_FOLDER_ID || "").trim();

  const ready = !!(sa?.client_email && folderId);

  return {
    serviceAccount: !!sa?.client_email,
    serviceAccountEmail: sa?.client_email || null,
    oauthClient: hasOAuthClient,
    oauthRefreshToken: hasRefresh,
    folderIdConfigured: !!folderId,
    folderId: folderId || null,
    ready,
    mode: (sa?.client_email
      ? "service_account"
      : hasOAuthClient && hasRefresh
        ? "oauth"
        : "none") as DriveAuthMode,
    missing: [
      !sa?.client_email ? "GOOGLE_SERVICE_ACCOUNT_JSON (or email+private key)" : null,
      !folderId ? "GOOGLE_DRIVE_FOLDER_ID" : null,
    ].filter(Boolean) as string[],
    notes: [
      "Share the Drive folder with the service account as Content manager (or Editor) for upload/edit/delete.",
      "Drive API must be enabled on the GCP project.",
    ],
  };
}

export async function getAccessToken(): Promise<{
  token: string;
  folderId: string;
  mode: DriveAuthMode;
}> {
  const folderId = (process.env.GOOGLE_DRIVE_FOLDER_ID || "").trim();
  if (!folderId) {
    throw new Error("GOOGLE_DRIVE_FOLDER_ID is not set");
  }

  const sa = loadServiceAccountFromEnv();
  if (sa?.client_email && sa?.private_key) {
    const client = new JWT({
      email: sa.client_email,
      key: sa.private_key.replace(/\\n/g, "\n"),
      scopes: DRIVE_SCOPES,
    });
    const { token } = await client.getAccessToken();
    if (!token) throw new Error("Failed to obtain service account access token");
    return { token, folderId, mode: "service_account" };
  }

  const clientId =
    process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret =
    process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken =
    process.env.GOOGLE_REFRESH_TOKEN || process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (clientId && clientSecret && refreshToken) {
    const oauth = new OAuth2Client(clientId, clientSecret);
    oauth.setCredentials({ refresh_token: refreshToken });
    const { token } = await oauth.getAccessToken();
    if (!token) throw new Error("Failed to obtain OAuth access token");
    return { token, folderId, mode: "oauth" };
  }

  throw new Error(
    "No Google Drive credentials available. Set GOOGLE_SERVICE_ACCOUNT_JSON and GOOGLE_DRIVE_FOLDER_ID."
  );
}
