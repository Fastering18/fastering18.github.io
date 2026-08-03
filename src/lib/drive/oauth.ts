import { OAuth2Client } from "google-auth-library";

export const DRIVE_SCOPES_PUBLIC = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/userinfo.email",
];

export function getOAuthClientCredentials() {
  const clientId =
    process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_OAUTH_CLIENT_ID || "";
  const clientSecret =
    process.env.GOOGLE_CLIENT_SECRET ||
    process.env.GOOGLE_OAUTH_CLIENT_SECRET ||
    "";
  return { clientId, clientSecret };
}

export function getOAuthRedirectUri(origin?: string) {
  if (process.env.GOOGLE_OAUTH_REDIRECT_URI) {
    return process.env.GOOGLE_OAUTH_REDIRECT_URI;
  }
  const base =
    origin ||
    process.env.NEXTAUTH_URL ||
    process.env.AUTH_URL ||
    "http://localhost:3000";
  return `${base.replace(/\/$/, "")}/api/admin/cdn/oauth/callback`;
}

export function createOAuth2Client(redirectUri?: string) {
  const { clientId, clientSecret } = getOAuthClientCredentials();
  if (!clientId || !clientSecret) {
    throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required");
  }
  return new OAuth2Client(
    clientId,
    clientSecret,
    redirectUri || getOAuthRedirectUri()
  );
}
