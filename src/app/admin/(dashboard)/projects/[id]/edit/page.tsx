import { getProjectById, updateProject } from "@/app/actions/projects";
import { notFound, redirect } from "next/navigation";
import ProjectEditorForm from "@/components/admin/ProjectEditorForm";
import styles from "./ProjectEdit.module.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditProjectPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const project = await getProjectById(parseInt(id));

    if (!project) {
        notFound();
    }

    async function handleUpdate(formData: FormData) {
        "use server";
        const id = parseInt(formData.get("id") as string);
        const title = formData.get("title") as string;
        const summary = formData.get("summary") as string;
        const description = formData.get("description") as string;
        const image = formData.get("image") as string;
        const projectDate = new Date(formData.get("projectDate") as string);
        const tags = (formData.get("tags") as string).split(",").map(t => t.trim()).filter(t => t);

        // Parse links JSON
        const linksJson = formData.get("links") as string;
        const links = JSON.parse(linksJson);

        await updateProject(id, {
            title,
            summary,
            description,
            image,
            projectDate,
            tags,
            links
        });

        redirect("/admin/projects");
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/admin/projects" className={styles.backBtn}>
                    <ArrowLeft size={18} />
                    <span>Back to Projects</span>
                </Link>
                <h1 className={styles.title}>Edit Project: {project.title}</h1>
            </header>

            <ProjectEditorForm project={project} action={handleUpdate} />
        </div>
    );
}
