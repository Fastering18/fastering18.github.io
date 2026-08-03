import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  createOAuth2Client,
  DRIVE_SCOPES_PUBLIC,
  getOAuthClientCredentials,
  getOAuthRedirectUri,
} from "@/lib/drive/oauth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const { clientId, clientSecret } = getOAuthClientCredentials();
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      new URL(
        "/admin/cdn?oauth=error&reason=" +
          encodeURIComponent("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET"),
        req.url
      )
    );
  }

  // Fixed URI — must match Google Console Authorized redirect URIs character-for-character
  const redirectUri = getOAuthRedirectUri();
  const client = createOAuth2Client(redirectUri);

  const url = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: DRIVE_SCOPES_PUBLIC,
    include_granted_scopes: true,
    // help debug: state not required but we keep redirect stable
  });

  // Optional local debug header for developers
  const res = NextResponse.redirect(url);
  res.headers.set("x-oauth-redirect-uri", redirectUri);
  return res;
}
