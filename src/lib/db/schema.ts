import { pgTable, text, serial, timestamp, boolean, integer, jsonb, index } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    summary: text("summary"),
    description: text("description").notNull(),
    image: text("image").notNull(),
    gallery: text("gallery").array().default([]),
    tags: text("tags").array().notNull(),
    links: jsonb("links").default([]),
    projectDate: timestamp("project_date").notNull(),
    isVisible: boolean("is_visible").default(true),
    order: integer("order").default(0),
    createdAt: timestamp("created_at").defaultNow(),
});

export const skills = pgTable("skills", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    iconUrl: text("icon_url"),
    isVisible: boolean("is_visible").default(true),
    order: integer("order").default(0),
});

export const config = pgTable("config", {
    key: text("key").primaryKey(),
    value: text("value").notNull(),
});

/** Public site traffic events (admin-only reads). */
export const pageViews = pgTable(
    "page_views",
    {
        id: serial("id").primaryKey(),
        path: text("path").notNull(),
        referrer: text("referrer"),
        country: text("country"),
        region: text("region"),
        city: text("city"),
        browser: text("browser"),
        os: text("os"),
        device: text("device"),
        language: text("language"),
        screen: text("screen"),
        visitorId: text("visitor_id"),
        sessionId: text("session_id"),
        userAgent: text("user_agent"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [
        index("page_views_created_at_idx").on(table.createdAt),
        index("page_views_visitor_idx").on(table.visitorId),
        index("page_views_country_idx").on(table.country),
        index("page_views_path_idx").on(table.path),
    ]
);
