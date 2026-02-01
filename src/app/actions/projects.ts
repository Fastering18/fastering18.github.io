"use server";

import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getProjects() {
    return await db.select().from(projects).orderBy(desc(projects.order));
}

export async function toggleProjectVisibility(id: number, isVisible: boolean) {
    await db.update(projects).set({ isVisible }).where(eq(projects.id, id));
    revalidatePath("/admin/projects");
    revalidatePath("/");
}

export async function deleteProject(id: number) {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath("/admin/projects");
    revalidatePath("/");
}

export async function addProject(data: typeof projects.$inferInsert) {
    await db.insert(projects).values(data);
    revalidatePath("/admin/projects");
    revalidatePath("/");
}
