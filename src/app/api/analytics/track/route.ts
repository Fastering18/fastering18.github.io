import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pageViews } from "@/lib/db/schema";
import { isBotUA, parseUserAgent } from "@/lib/analytics/ua";
import { ensurePageViewsTable } from "@/lib/analytics/stats";

export const runtime = "nodejs";

const MAX_PATH = 500;
const MAX_STR = 200;

// Simple per-IP rate limit (in-memory; best-effort on serverless)
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 40;

function rateLimit(ip: string) {
    const now = Date.now();
    const row = hits.get(ip);
    if (!row || now > row.reset) {
        hits.set(ip, { count: 1, reset: now + WINDOW_MS });
        return true;
    }
    if (row.count >= MAX_PER_WINDOW) return false;
    row.count += 1;
    return true;
}

function clean(value: unknown, max = MAX_STR) {
    if (typeof value !== "string") return null;
    const v = value.trim().slice(0, max);
    return v.length ? v : null;
}

function sanitizePath(path: unknown) {
    const p = clean(path, MAX_PATH) || "/";
    if (!p.startsWith("/")) return "/";
    if (p.startsWith("/admin") || p.startsWith("/api")) return null;
    return p;
}

export async function POST(req: NextRequest) {
    try {
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            "unknown";

        if (!rateLimit(ip)) {
            return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
        }

        const ua = req.headers.get("user-agent");
        if (isBotUA(ua)) {
            return NextResponse.json({ ok: true, skipped: "bot" });
        }

        const body = await req.json().catch(() => ({}));
        const path = sanitizePath(body.path);
        if (!path) {
            return NextResponse.json({ ok: false, error: "invalid_path" }, { status: 400 });
        }

        const parsed = parseUserAgent(ua);

        // Prefer edge geo headers (Vercel / Cloudflare)
        const country =
            req.headers.get("x-vercel-ip-country") ||
            req.headers.get("cf-ipcountry") ||
            clean(body.country) ||
            null;
        const region =
            req.headers.get("x-vercel-ip-country-region") ||
            clean(body.region) ||
            null;
        const city = req.headers.get("x-vercel-ip-city")
            ? decodeURIComponent(req.headers.get("x-vercel-ip-city")!)
            : clean(body.city);

        await ensurePageViewsTable();

        await db.insert(pageViews).values({
            path,
            referrer: clean(body.referrer, 500),
            country: country && country !== "XX" ? country : null,
            region,
            city,
            browser: parsed.browser,
            os: parsed.os,
            device: parsed.device,
            language: clean(body.language, 32),
            screen: clean(body.screen, 32),
            visitorId: clean(body.visitorId, 64),
            sessionId: clean(body.sessionId, 64),
            userAgent: ua ? ua.slice(0, 400) : null,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[analytics/track]", err);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ ok: true, service: "analytics-track" });
}
