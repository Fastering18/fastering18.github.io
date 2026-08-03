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
    return NextResponse.json(
      {
        error:
          "Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET before connecting Drive.",
      },
      { status: 400 }
    );
  }

  const origin = new URL(req.url).origin;
  const redirectUri = getOAuthRedirectUri(origin);
  const client = createOAuth2Client(redirectUri);

  const url = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: DRIVE_SCOPES_PUBLIC,
    include_granted_scopes: true,
  });

  return NextResponse.redirect(url);
}
