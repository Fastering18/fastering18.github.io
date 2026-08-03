import { JWT, OAuth2Client } from "google-auth-library";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export type DriveAuthMode = "service_account" | "oauth" | "none";

type ServiceAccountJson = {
  client_email?: string;
  private_key?: string;
  project_id?: string;
  type?: string;
};

function loadServiceAccountFromEnv(): ServiceAccountJson | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (raw) {
    try {
      return JSON.parse(raw) as ServiceAccountJson;
    } catch {
      try {
        return JSON.parse(
          Buffer.from(raw, "base64").toString("utf8")
        ) as ServiceAccountJson;
      } catch {
        return null;
      }
    }
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
    return JSON.parse(readFileSync(localPath, "utf8")) as ServiceAccountJson;
  }

  return null;
}

export function getDriveAuthStatus() {
  const sa = loadServiceAccountFromEnv();
  const hasOAuthClient =
    !!(process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_OAUTH_CLIENT_ID) &&
    !!(process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_OAUTH_CLIENT_SECRET);
  const hasRefresh = !!(
    process.env.GOOGLE_REFRESH_TOKEN || process.env.GOOGLE_OAUTH_REFRESH_TOKEN
  );
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID || "";

  return {
    serviceAccount: !!sa?.client_email,
    serviceAccountEmail: sa?.client_email || null,
    oauthClient: hasOAuthClient,
    oauthRefreshToken: hasRefresh,
    folderIdConfigured: !!folderId,
    folderId: folderId || null,
    ready: !!(sa?.client_email && folderId),
    mode: (sa?.client_email
      ? "service_account"
      : hasOAuthClient && hasRefresh
        ? "oauth"
        : "none") as DriveAuthMode,
    missing: [
      !sa?.client_email ? "service_account_json_or_email_key" : null,
      !folderId ? "GOOGLE_DRIVE_FOLDER_ID" : null,
      hasOAuthClient && !hasRefresh
        ? "GOOGLE_REFRESH_TOKEN (needed for google-drive-s3 / user OAuth only)"
        : null,
    ].filter(Boolean) as string[],
  };
}

export async function getAccessToken(): Promise<{
  token: string;
  folderId: string;
  mode: DriveAuthMode;
}> {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!folderId) {
    throw new Error("GOOGLE_DRIVE_FOLDER_ID is not set");
  }

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
    "No Google Drive credentials available. Set service account JSON or OAuth client + refresh token."
  );
}
