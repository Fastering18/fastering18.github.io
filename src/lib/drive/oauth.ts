import { OAuth2Client } from "google-auth-library";
import { SITE_URL } from "@/lib/seo";

/**
 * Full Drive access for list/upload/rename/delete.
 * Must also be added under OAuth consent screen → Data access / Scopes.
 */
export const DRIVE_SCOPE = "https://www.googleapis.com/auth/drive";
export const EMAIL_SCOPE = "https://www.googleapis.com/auth/userinfo.email";

/** Space-separated scopes sent to Google (order can matter for display). */
export const DRIVE_SCOPES_PUBLIC = [DRIVE_SCOPE, EMAIL_SCOPE];

export function scopesToParam(scopes: string[] = DRIVE_SCOPES_PUBLIC) {
  return scopes.join(" ");
}

export function hasDriveScope(scopeString?: string | null) {
  if (!scopeString) return false;
  // Accept full drive or readonly
  return (
    scopeString.includes("googleapis.com/auth/drive") ||
    scopeString.includes("auth/drive")
  );
}

/** Canonical callback path (must match Google Cloud Console exactly). */
export const OAUTH_CALLBACK_PATH = "/api/admin/cdn/oauth/callback";

export function getOAuthClientCredentials() {
  const clientId = (
    process.env.GOOGLE_CLIENT_ID ||
    process.env.GOOGLE_OAUTH_CLIENT_ID ||
    ""
  )
    .trim()
    .replace(/^["']|["']$/g, "");
  const clientSecret = (
    process.env.GOOGLE_CLIENT_SECRET ||
    process.env.GOOGLE_OAUTH_CLIENT_SECRET ||
    ""
  )
    .trim()
    .replace(/^["']|["']$/g, "");
  return { clientId, clientSecret };
}

/**
 * Fixed redirect URI so Google Console and token exchange match.
 * Not derived from request host / NEXTAUTH_URL.
 */
export function getOAuthRedirectUri(_origin?: string) {
  const explicit = (process.env.GOOGLE_OAUTH_REDIRECT_URI || "")
    .trim()
    .replace(/\/$/, "");
  if (explicit) return explicit;

  const base = (process.env.NEXT_PUBLIC_SITE_URL || SITE_URL).replace(
    /\/$/,
    ""
  );
  return `${base}${OAUTH_CALLBACK_PATH}`;
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

export function getOAuthDebugInfo() {
  const { clientId } = getOAuthClientCredentials();
  return {
    clientIdPrefix: clientId ? `${clientId.slice(0, 24)}...` : null,
    redirectUri: getOAuthRedirectUri(),
    scopes: DRIVE_SCOPES_PUBLIC,
    mustMatchConsoleExactly: true,
  };
}
