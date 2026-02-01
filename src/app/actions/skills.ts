"use server";

import { db } from "@/lib/db";
import { skills } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getSkills() {
    return await db.select().from(skills).orderBy(asc(skills.order));
}

export async function toggleSkillVisibility(id: number, isVisible: boolean) {
    await db.update(skills).set({ isVisible }).where(eq(skills.id, id));
    revalidatePath("/admin/skills");
    revalidatePath("/");
}

export async function deleteSkill(id: number) {
    await db.delete(skills).where(eq(skills.id, id));
    revalidatePath("/admin/skills");
    revalidatePath("/");
}

export async function addSkill(data: typeof skills.$inferInsert) {
    await db.insert(skills).values(data);
    revalidatePath("/admin/skills");
    revalidatePath("/");
}

export async function updateSkill(id: number, data: Partial<typeof skills.$inferInsert>) {
    await db.update(skills).set(data).where(eq(skills.id, id));
    revalidatePath("/admin/skills");
    revalidatePath("/");
}
