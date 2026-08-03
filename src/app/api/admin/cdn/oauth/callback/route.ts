import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createOAuth2Client, getOAuthRedirectUri } from "@/lib/drive/oauth";
import {
  CONFIG_OAUTH_EMAIL_KEY,
  CONFIG_REFRESH_TOKEN_KEY,
} from "@/lib/drive/auth";
import { updateConfig } from "@/app/actions/config";
import { SITE_URL } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function adminCdnUrl(query: string) {
  // Always send user back to canonical admin after OAuth (not vercel.app host)
  return `${SITE_URL.replace(/\/$/, "")}/admin/cdn?${query}`;
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", SITE_URL));
  }

  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      adminCdnUrl(`oauth=error&reason=${encodeURIComponent(error)}`)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      adminCdnUrl("oauth=error&reason=missing_code")
    );
  }

  try {
    // MUST be identical to the redirect_uri used in /oauth/start
    const redirectUri = getOAuthRedirectUri();
    const client = createOAuth2Client(redirectUri);
    const { tokens } = await client.getToken(code);

    if (!tokens.refresh_token) {
      return NextResponse.redirect(
        adminCdnUrl(
          "oauth=error&reason=" +
            encodeURIComponent(
              "no_refresh_token: revoke app access at https://myaccount.google.com/permissions then Connect again with prompt=consent"
            )
        )
      );
    }

    await updateConfig(CONFIG_REFRESH_TOKEN_KEY, tokens.refresh_token);

    try {
      client.setCredentials(tokens);
      if (tokens.access_token) {
        const tokenInfo = await client.getTokenInfo(tokens.access_token);
        if (tokenInfo.email) {
          await updateConfig(CONFIG_OAUTH_EMAIL_KEY, tokenInfo.email);
        }
      }
    } catch {
      /* optional */
    }

    return NextResponse.redirect(adminCdnUrl("oauth=connected"));
  } catch (e) {
    const message = e instanceof Error ? e.message : "oauth_failed";
    const redirectUri = getOAuthRedirectUri();
    return NextResponse.redirect(
      adminCdnUrl(
        `oauth=error&reason=${encodeURIComponent(message)}&redirect_uri=${encodeURIComponent(redirectUri)}`
      )
    );
  }
}
