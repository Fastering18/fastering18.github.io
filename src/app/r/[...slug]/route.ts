import { NextRequest } from "next/server";
import { serveCdnFile } from "@/lib/drive/serve";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function keyFromSlug(slug: string[]) {
  return slug.map((s) => {
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  }).join("/");
}

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await ctx.params;
  return serveCdnFile(keyFromSlug(slug), "GET");
}

export async function HEAD(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await ctx.params;
  return serveCdnFile(keyFromSlug(slug), "HEAD");
}
