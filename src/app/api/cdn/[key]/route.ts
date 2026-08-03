import { NextRequest, NextResponse } from "next/server";
import {
  fetchDriveFileMedia,
  findFileInCdnFolder,
  guessContentType,
  isValidCdnKey,
} from "@/lib/drive/cdn";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function serveKey(key: string, method: "GET" | "HEAD") {
  if (!isValidCdnKey(key)) {
    return NextResponse.json({ error: "invalid_key" }, { status: 400 });
  }

  try {
    const meta = await findFileInCdnFolder(key);
    if (!meta) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const contentType = guessContentType(meta.name, meta.mimeType);
    const headers = new Headers({
      "Content-Type": contentType,
      "Cache-Control":
        "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
      "X-CDN-Source": "google-drive",
      "X-CDN-File": meta.name,
      ...(meta.size ? { "Content-Length": meta.size } : {}),
      ...(meta.md5Checksum ? { ETag: `"${meta.md5Checksum}"` } : {}),
      ...(meta.modifiedTime
        ? { "Last-Modified": new Date(meta.modifiedTime).toUTCString() }
        : {}),
      "Content-Disposition": `inline; filename="${meta.name.replace(/"/g, "")}"`,
    });

    if (method === "HEAD") {
      return new NextResponse(null, { status: 200, headers });
    }

    const media = await fetchDriveFileMedia(meta.id);
    return new NextResponse(media.body, { status: 200, headers });
  } catch (err) {
    console.error("[cdn]", err);
    const message = err instanceof Error ? err.message : "cdn_error";
    const status =
      message.includes("not set") || message.includes("credentials")
        ? 503
        : 500;
    return NextResponse.json(
      { error: "cdn_unavailable", message },
      { status }
    );
  }
}

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ key: string }> }
) {
  const { key } = await ctx.params;
  return serveKey(decodeURIComponent(key), "GET");
}

export async function HEAD(
  _req: NextRequest,
  ctx: { params: Promise<{ key: string }> }
) {
  const { key } = await ctx.params;
  return serveKey(decodeURIComponent(key), "HEAD");
}
