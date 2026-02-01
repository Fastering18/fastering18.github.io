"use server";

import { db } from "@/lib/db";
import { config } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getConfig() {
    const result = await db.select().from(config);
    return result.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>);
}

export async function updateConfig(key: string, value: string) {
    await db.insert(config)
        .values({ key, value })
        .onConflictDoUpdate({ target: config.key, set: { value } });
    revalidatePath("/admin/settings");
    revalidatePath("/");
}
