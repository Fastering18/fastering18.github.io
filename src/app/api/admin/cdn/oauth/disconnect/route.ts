import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { updateConfig } from "@/app/actions/config";
import {
  CONFIG_OAUTH_EMAIL_KEY,
  CONFIG_REFRESH_TOKEN_KEY,
} from "@/lib/drive/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  await updateConfig(CONFIG_REFRESH_TOKEN_KEY, "");
  await updateConfig(CONFIG_OAUTH_EMAIL_KEY, "");

  return NextResponse.redirect(new URL("/admin/cdn?oauth=disconnected", req.url));
}
