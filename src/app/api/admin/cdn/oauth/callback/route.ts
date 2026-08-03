import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  createOAuth2Client,
  getOAuthRedirectUri,
} from "@/lib/drive/oauth";
import {
  CONFIG_OAUTH_EMAIL_KEY,
  CONFIG_REFRESH_TOKEN_KEY,
} from "@/lib/drive/auth";
import { updateConfig } from "@/app/actions/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(
        `/admin/cdn?oauth=error&reason=${encodeURIComponent(error)}`,
        req.url
      )
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/admin/cdn?oauth=error&reason=missing_code", req.url)
    );
  }

  try {
    const origin = url.origin;
    const redirectUri = getOAuthRedirectUri(origin);
    const client = createOAuth2Client(redirectUri);
    const { tokens } = await client.getToken(code);

    if (!tokens.refresh_token) {
      // Google only returns refresh_token on first consent sometimes
      return NextResponse.redirect(
        new URL(
          "/admin/cdn?oauth=error&reason=no_refresh_token_try_again_with_consent",
          req.url
        )
      );
    }

    await updateConfig(CONFIG_REFRESH_TOKEN_KEY, tokens.refresh_token);

    // Best-effort email for status display
    try {
      client.setCredentials(tokens);
      const tokenInfo = await client.getTokenInfo(tokens.access_token || "");
      if (tokenInfo.email) {
        await updateConfig(CONFIG_OAUTH_EMAIL_KEY, tokenInfo.email);
      }
    } catch {
      /* optional */
    }

    return NextResponse.redirect(new URL("/admin/cdn?oauth=connected", req.url));
  } catch (e) {
    const message = e instanceof Error ? e.message : "oauth_failed";
    return NextResponse.redirect(
      new URL(
        `/admin/cdn?oauth=error&reason=${encodeURIComponent(message)}`,
        req.url
      )
    );
  }
}
