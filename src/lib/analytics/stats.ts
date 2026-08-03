import { db } from "@/lib/db";
import { pageViews } from "@/lib/db/schema";
import { sql, gte, and, ne } from "drizzle-orm";

export type AnalyticsSnapshot = {
    totalViews: number;
    uniqueVisitors: number;
    uniqueSessions: number;
    todayViews: number;
    last7DaysViews: number;
    byDay: { date: string; views: number; visitors: number }[];
    byCountry: { country: string; views: number; visitors: number }[];
    byDevice: { device: string; views: number }[];
    byBrowser: { browser: string; views: number }[];
    byOs: { os: string; views: number }[];
    byLanguage: { language: string; views: number }[];
    byPath: { path: string; views: number }[];
    recent: {
        id: number;
        path: string;
        country: string | null;
        city: string | null;
        device: string | null;
        browser: string | null;
        createdAt: Date | null;
    }[];
};

function startOfUtcDay(d = new Date()) {
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function daysAgo(n: number) {
    const d = startOfUtcDay();
    d.setUTCDate(d.getUTCDate() - n);
    return d;
}

export async function ensurePageViewsTable() {
    await db.execute(sql`
        CREATE TABLE IF NOT EXISTS page_views (
            id serial PRIMARY KEY,
            path text NOT NULL,
            referrer text,
            country text,
            region text,
            city text,
            browser text,
            os text,
            device text,
            language text,
            screen text,
            visitor_id text,
            session_id text,
            user_agent text,
            created_at timestamp DEFAULT now() NOT NULL
        )
    `);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON page_views (created_at)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS page_views_visitor_idx ON page_views (visitor_id)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS page_views_country_idx ON page_views (country)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS page_views_path_idx ON page_views (path)`);
}

export async function getAnalyticsSnapshot(days = 30): Promise<AnalyticsSnapshot> {
    await ensurePageViewsTable();

    const since = daysAgo(days - 1);
    const today = startOfUtcDay();
    const week = daysAgo(6);

    const [totals] = await db
        .select({
            totalViews: sql<number>`count(*)::int`,
            uniqueVisitors: sql<number>`count(distinct ${pageViews.visitorId})::int`,
            uniqueSessions: sql<number>`count(distinct ${pageViews.sessionId})::int`,
        })
        .from(pageViews)
        .where(ne(pageViews.device, "bot"));

    const [todayRow] = await db
        .select({ views: sql<number>`count(*)::int` })
        .from(pageViews)
        .where(and(gte(pageViews.createdAt, today), ne(pageViews.device, "bot")));

    const [weekRow] = await db
        .select({ views: sql<number>`count(*)::int` })
        .from(pageViews)
        .where(and(gte(pageViews.createdAt, week), ne(pageViews.device, "bot")));

    const byDayRaw = await db.execute(sql`
        SELECT
            to_char(date_trunc('day', created_at AT TIME ZONE 'UTC'), 'YYYY-MM-DD') AS date,
            count(*)::int AS views,
            count(DISTINCT visitor_id)::int AS visitors
        FROM page_views
        WHERE created_at >= ${since}
          AND (device IS NULL OR device <> 'bot')
        GROUP BY 1
        ORDER BY 1 ASC
    `);

    const byCountryRaw = await db.execute(sql`
        SELECT
            COALESCE(NULLIF(country, ''), 'Unknown') AS country,
            count(*)::int AS views,
            count(DISTINCT visitor_id)::int AS visitors
        FROM page_views
        WHERE created_at >= ${since}
          AND (device IS NULL OR device <> 'bot')
        GROUP BY 1
        ORDER BY views DESC
        LIMIT 12
    `);

    const byDeviceRaw = await db.execute(sql`
        SELECT COALESCE(NULLIF(device, ''), 'unknown') AS device, count(*)::int AS views
        FROM page_views
        WHERE created_at >= ${since}
          AND (device IS NULL OR device <> 'bot')
        GROUP BY 1
        ORDER BY views DESC
    `);

    const byBrowserRaw = await db.execute(sql`
        SELECT COALESCE(NULLIF(browser, ''), 'Unknown') AS browser, count(*)::int AS views
        FROM page_views
        WHERE created_at >= ${since}
          AND (device IS NULL OR device <> 'bot')
        GROUP BY 1
        ORDER BY views DESC
        LIMIT 8
    `);

    const byOsRaw = await db.execute(sql`
        SELECT COALESCE(NULLIF(os, ''), 'Unknown') AS os, count(*)::int AS views
        FROM page_views
        WHERE created_at >= ${since}
          AND (device IS NULL OR device <> 'bot')
        GROUP BY 1
        ORDER BY views DESC
        LIMIT 8
    `);

    const byLanguageRaw = await db.execute(sql`
        SELECT COALESCE(NULLIF(split_part(language, '-', 1), ''), 'unknown') AS language, count(*)::int AS views
        FROM page_views
        WHERE created_at >= ${since}
          AND (device IS NULL OR device <> 'bot')
        GROUP BY 1
        ORDER BY views DESC
        LIMIT 8
    `);

    const byPathRaw = await db.execute(sql`
        SELECT path, count(*)::int AS views
        FROM page_views
        WHERE created_at >= ${since}
          AND (device IS NULL OR device <> 'bot')
        GROUP BY path
        ORDER BY views DESC
        LIMIT 10
    `);

    const recent = await db
        .select({
            id: pageViews.id,
            path: pageViews.path,
            country: pageViews.country,
            city: pageViews.city,
            device: pageViews.device,
            browser: pageViews.browser,
            createdAt: pageViews.createdAt,
        })
        .from(pageViews)
        .where(ne(pageViews.device, "bot"))
        .orderBy(sql`${pageViews.createdAt} desc`)
        .limit(15);

    const rows = <T,>(result: { rows?: T[] } | T[]): T[] =>
        Array.isArray(result) ? result : (result.rows ?? []);

    return {
        totalViews: Number(totals?.totalViews ?? 0),
        uniqueVisitors: Number(totals?.uniqueVisitors ?? 0),
        uniqueSessions: Number(totals?.uniqueSessions ?? 0),
        todayViews: Number(todayRow?.views ?? 0),
        last7DaysViews: Number(weekRow?.views ?? 0),
        byDay: rows<{ date: string; views: number; visitors: number }>(byDayRaw as any).map((r) => ({
            date: String(r.date),
            views: Number(r.views),
            visitors: Number(r.visitors),
        })),
        byCountry: rows<{ country: string; views: number; visitors: number }>(byCountryRaw as any).map((r) => ({
            country: String(r.country),
            views: Number(r.views),
            visitors: Number(r.visitors),
        })),
        byDevice: rows<{ device: string; views: number }>(byDeviceRaw as any).map((r) => ({
            device: String(r.device),
            views: Number(r.views),
        })),
        byBrowser: rows<{ browser: string; views: number }>(byBrowserRaw as any).map((r) => ({
            browser: String(r.browser),
            views: Number(r.views),
        })),
        byOs: rows<{ os: string; views: number }>(byOsRaw as any).map((r) => ({
            os: String(r.os),
            views: Number(r.views),
        })),
        byLanguage: rows<{ language: string; views: number }>(byLanguageRaw as any).map((r) => ({
            language: String(r.language),
            views: Number(r.views),
        })),
        byPath: rows<{ path: string; views: number }>(byPathRaw as any).map((r) => ({
            path: String(r.path),
            views: Number(r.views),
        })),
        recent,
    };
}
