import { pgTable, text, serial, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    summary: text("summary"),
    description: text("description").notNull(),
    image: text("image").notNull(),
    tags: text("tags").array().notNull(),
    links: jsonb("links").default([]), // Configurable links: { label, url, type }
    projectDate: timestamp("project_date").notNull(),
    isVisible: boolean("is_visible").default(true),
    order: integer("order").default(0),
    createdAt: timestamp("created_at").defaultNow(),
});

export const skills = pgTable("skills", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    category: text("category").notNull(), // Frontend, Backend, etc.
    iconUrl: text("icon_url"),
    isVisible: boolean("is_visible").default(true),
    order: integer("order").default(0),
});

export const config = pgTable("config", {
    key: text("key").primaryKey(),
    value: text("value").notNull(),
});
