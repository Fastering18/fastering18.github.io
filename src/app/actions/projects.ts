"use server";

import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getProjects() {
    return await db.select({
        id: projects.id,
        title: projects.title,
        summary: projects.summary,
        description: projects.description,
        image: projects.image,
        tags: projects.tags,
        links: projects.links,
        projectDate: projects.projectDate,
        isVisible: projects.isVisible,
        order: projects.order,
        createdAt: projects.createdAt
    }).from(projects).orderBy(desc(projects.order));
}

export async function getProjectById(id: number) {
    const results = await db.select({
        id: projects.id,
        title: projects.title,
        summary: projects.summary,
        description: projects.description,
        image: projects.image,
        tags: projects.tags,
        links: projects.links,
        projectDate: projects.projectDate,
        isVisible: projects.isVisible,
        order: projects.order,
        createdAt: projects.createdAt
    }).from(projects).where(eq(projects.id, id));
    return results[0] || null;
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

export async function updateProject(id: number, data: Partial<typeof projects.$inferInsert>) {
    await db.update(projects).set(data).where(eq(projects.id, id));
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${id}`);
    revalidatePath("/");
}
