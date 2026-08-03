import { NextRequest, NextResponse } from "next/server";

/**
 * Root CDN keys: /file name.png, /photo.jpg, /clip.mp4
 * Spaces and encoded %20 supported. Embed page at /v/..., raw at /r/...
 */
const ROOT_FILE = /^\/([^/]+?\.[A-Za-z0-9]{1,16})$/i;

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

const RESERVED_PREFIXES = [
  "/admin",
  "/api",
  "/projects",
  "/blackerz",
  "/privacy-policy",
  "/tos",
  "/feed",
  "/r/",
  "/v/",
  "/_next",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /r/... is handled by app/r/[...slug] raw route
  if (pathname === "/r" || pathname.startsWith("/r/")) {
    return NextResponse.next();
  }

  if (RESERVED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const match = pathname.match(ROOT_FILE);
  if (!match) return NextResponse.next();

  let key = match[1];
  try {
    key = decodeURIComponent(key);
  } catch {
    /* keep raw */
  }

  const lower = key.toLowerCase();
  if (RESERVED_FILES.has(lower)) return NextResponse.next();
  if (lower.startsWith("google") && lower.endsWith(".html")) {
    return NextResponse.next();
  }

  // Embed viewer (Discord/Tenor style), not direct bytes
  const url = req.nextUrl.clone();
  url.pathname = `/v/${encodeURIComponent(key)}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Root-level filename paths and optional raw prefix.
     * Exclude static Next internals.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
