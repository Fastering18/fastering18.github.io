import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  createOAuth2Client,
  DRIVE_SCOPES_PUBLIC,
  getOAuthClientCredentials,
  getOAuthRedirectUri,
  scopesToParam,
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

  const redirectUri = getOAuthRedirectUri();
  const client = createOAuth2Client(redirectUri);

  // Force re-consent so Google issues a token that includes Drive (not an old limited grant)
  const url = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent select_account",
    scope: scopesToParam(DRIVE_SCOPES_PUBLIC),
    include_granted_scopes: false,
  });

  const res = NextResponse.redirect(url);
  res.headers.set("x-oauth-redirect-uri", redirectUri);
  res.headers.set("x-oauth-scopes", scopesToParam(DRIVE_SCOPES_PUBLIC));
  return res;
}
