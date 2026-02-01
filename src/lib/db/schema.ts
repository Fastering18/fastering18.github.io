import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    image: text("image").notNull(),
    tags: text("tags").array().notNull(), // PostgreSQL array
    link: text("link"),
    github: text("github"),
    year: text("year").notNull(),
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
