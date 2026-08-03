import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { updateConfig } from "@/app/actions/config";
import {
  CONFIG_OAUTH_EMAIL_KEY,
  CONFIG_OAUTH_SCOPES_KEY,
  CONFIG_REFRESH_TOKEN_KEY,
} from "@/lib/drive/auth";
import { SITE_URL } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  await updateConfig(CONFIG_REFRESH_TOKEN_KEY, "");
  await updateConfig(CONFIG_OAUTH_EMAIL_KEY, "");
  await updateConfig(CONFIG_OAUTH_SCOPES_KEY, "");

  return NextResponse.redirect(
    `${SITE_URL.replace(/\/$/, "")}/admin/cdn?oauth=disconnected`,
    303
  );
}
