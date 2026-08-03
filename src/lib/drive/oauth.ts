import { OAuth2Client } from "google-auth-library";
import { SITE_URL } from "@/lib/seo";

export const DRIVE_SCOPES_PUBLIC = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/userinfo.email",
];

/** Canonical callback path (must match Google Cloud Console exactly). */
export const OAUTH_CALLBACK_PATH = "/api/admin/cdn/oauth/callback";

export function getOAuthClientCredentials() {
  const clientId = (
    process.env.GOOGLE_CLIENT_ID ||
    process.env.GOOGLE_OAUTH_CLIENT_ID ||
    ""
  ).trim();
  const clientSecret = (
    process.env.GOOGLE_CLIENT_SECRET ||
    process.env.GOOGLE_OAUTH_CLIENT_SECRET ||
    ""
  ).trim();
  return { clientId, clientSecret };
}

/**
 * Always use one fixed redirect URI so Google Console and the token exchange match.
 *
 * Priority:
 * 1. GOOGLE_OAUTH_REDIRECT_URI (full URL override)
 * 2. SITE_URL from seo (https://fastering.is-cool.dev) + callback path
 *
 * Do NOT derive from request Host / NEXTAUTH_URL — those can be
 * fastering.thedev.id, *.vercel.app, etc. and cause redirect_uri_mismatch.
 */
export function getOAuthRedirectUri(_origin?: string) {
  const explicit = (process.env.GOOGLE_OAUTH_REDIRECT_URI || "").trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  const base = (process.env.NEXT_PUBLIC_SITE_URL || SITE_URL).replace(/\/$/, "");
  return `${base}${OAUTH_CALLBACK_PATH}`;
}

export function createOAuth2Client(redirectUri?: string) {
  const { clientId, clientSecret } = getOAuthClientCredentials();
  if (!clientId || !clientSecret) {
    throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required");
  }
  // Trim credentials — Vercel sometimes includes quotes/whitespace
  return new OAuth2Client(
    clientId.replace(/^["']|["']$/g, ""),
    clientSecret.replace(/^["']|["']$/g, ""),
    redirectUri || getOAuthRedirectUri()
  );
}

/** Public helper for admin UI / debugging */
export function getOAuthDebugInfo() {
  const { clientId } = getOAuthClientCredentials();
  return {
    clientIdPrefix: clientId ? `${clientId.slice(0, 20)}...` : null,
    redirectUri: getOAuthRedirectUri(),
    mustMatchConsoleExactly: true,
  };
}
