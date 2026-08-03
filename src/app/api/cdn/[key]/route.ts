import { NextRequest } from "next/server";
import { serveCdnFile } from "@/lib/drive/serve";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ key: string }> }
) {
  const { key } = await ctx.params;
  return serveCdnFile(key, "GET");
}

export async function HEAD(
  _req: NextRequest,
  ctx: { params: Promise<{ key: string }> }
) {
  const { key } = await ctx.params;
  return serveCdnFile(key, "HEAD");
}
