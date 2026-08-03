import { NextRequest, NextResponse } from "next/server";

/** Root-level short CDN paths: /abc123.png or /filename.webp */
const ROOT_FILE =
  /^\/([A-Za-z0-9][A-Za-z0-9._-]{0,180}\.[A-Za-z0-9]{1,16})$/;

const RESERVED_FILES = new Set([
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "manifest.webmanifest",
  "site.webmanifest",
  "llms.txt",
  "icon.png",
  "apple-icon.png",
  "next.svg",
  "vercel.svg",
  "file.svg",
  "globe.svg",
  "window.svg",
]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only bare root files, not nested paths
  const match = pathname.match(ROOT_FILE);
  if (!match) return NextResponse.next();

  const key = match[1];
  const lower = key.toLowerCase();

  if (RESERVED_FILES.has(lower)) return NextResponse.next();
  // Google Search Console HTML verification files stay in /public
  if (lower.startsWith("google") && lower.endsWith(".html")) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = `/api/cdn/${encodeURIComponent(key)}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Root file-like paths only
    "/:file([^/]+\\.[A-Za-z0-9]{1,16})",
  ],
};
