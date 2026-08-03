import { addProject } from "@/app/actions/projects";
import { redirect } from "next/navigation";
import ProjectEditorForm from "@/components/admin/ProjectEditorForm";
import styles from "../[id]/edit/ProjectEdit.module.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function parseGallery(raw: string) {
    return raw
        .split(/\r?\n|,/)
        .map((s) => s.trim())
        .filter(Boolean);
}

export default function NewProjectPage() {
    async function handleCreate(formData: FormData) {
        "use server";
        const title = formData.get("title") as string;
        const summary = formData.get("summary") as string;
        const description = formData.get("description") as string;
        const image = formData.get("image") as string;
        const projectDate = new Date(formData.get("projectDate") as string);
        const tags = (formData.get("tags") as string).split(",").map(t => t.trim()).filter(t => t);
        const gallery = parseGallery((formData.get("gallery") as string) || "");
        const isVisible = formData.get("isVisible") === "true";
        const order = parseInt((formData.get("order") as string) || "0", 10);

        const linksJson = formData.get("links") as string;
        const links = JSON.parse(linksJson || "[]");

        await addProject({
            title,
            summary,
            description,
            image,
            projectDate,
            tags,
            gallery,
            links,
            isVisible,
            order: Number.isFinite(order) ? order : 0,
        });

        redirect("/admin/projects");
    }

    const blank = {
        title: "",
        summary: "",
        description: "## Challenge\n\n## What I Built\n\n- \n\n## Role\n",
        image: "/images/projects/",
        gallery: [],
        tags: [],
        links: [],
        projectDate: new Date(),
        isVisible: true,
        order: 0,
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/admin/projects" className={styles.backBtn}>
                    <ArrowLeft size={18} />
                    <span>Back to Projects</span>
                </Link>
                <h1 className={styles.title}>Add Project</h1>
            </header>

            <ProjectEditorForm project={blank} action={handleCreate} submitLabel="Create Project" />
        </div>
    );
}
