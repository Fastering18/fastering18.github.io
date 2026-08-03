import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  createOAuth2Client,
  getOAuthRedirectUri,
  hasDriveScope,
} from "@/lib/drive/oauth";
import {
  CONFIG_OAUTH_EMAIL_KEY,
  CONFIG_OAUTH_SCOPES_KEY,
  CONFIG_REFRESH_TOKEN_KEY,
} from "@/lib/drive/auth";
import { updateConfig } from "@/app/actions/config";
import { SITE_URL } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function adminCdnUrl(query: string) {
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
    return NextResponse.redirect(adminCdnUrl("oauth=error&reason=missing_code"));
  }

  try {
    const redirectUri = getOAuthRedirectUri();
    const client = createOAuth2Client(redirectUri);
    const { tokens } = await client.getToken(code);

    const scopeStr = tokens.scope || "";
    if (!hasDriveScope(scopeStr)) {
      return NextResponse.redirect(
        adminCdnUrl(
          "oauth=error&reason=" +
            encodeURIComponent(
              `missing_drive_scope (got: ${scopeStr || "none"}). Add https://www.googleapis.com/auth/drive on OAuth consent screen Data access, then Connect again and allow Drive.`
            )
        )
      );
    }

    if (!tokens.refresh_token) {
      return NextResponse.redirect(
        adminCdnUrl(
          "oauth=error&reason=" +
            encodeURIComponent(
              "no_refresh_token: open https://myaccount.google.com/permissions revoke this app, then Connect again"
            )
        )
      );
    }

    await updateConfig(CONFIG_REFRESH_TOKEN_KEY, tokens.refresh_token);
    await updateConfig(CONFIG_OAUTH_SCOPES_KEY, scopeStr);

    try {
      client.setCredentials(tokens);
      if (tokens.access_token) {
        const tokenInfo = await client.getTokenInfo(tokens.access_token);
        if (tokenInfo.email) {
          await updateConfig(CONFIG_OAUTH_EMAIL_KEY, tokenInfo.email);
        }
        // Prefer scopes from tokeninfo when present
        if (tokenInfo.scopes?.length) {
          await updateConfig(CONFIG_OAUTH_SCOPES_KEY, tokenInfo.scopes.join(" "));
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
