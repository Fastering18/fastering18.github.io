import { getProjects, toggleProjectVisibility, deleteProject } from "@/app/actions/projects";
import GlassCard from "@/components/GlassCard";
import styles from "./Projects.module.css";
import { Plus, Eye, EyeOff, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AdminProjectsPage() {
    const allProjects = await getProjects();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Manage Projects</h1>
                    <p className={styles.subtitle}>
                        {allProjects.length} projects · higher order appears first on the site.
                    </p>
                </div>
                <Link href="/admin/projects/new" className={styles.addLink}>
                    <Plus size={20} />
                    <span>Add Project</span>
                </Link>
            </header>

            <div className={styles.grid}>
                {allProjects.map((project) => (
                    <GlassCard key={project.id} className={styles.projectCard}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className={styles.image}
                                sizes="300px"
                            />
                            {!project.isVisible && (
                                <span className={styles.hiddenBadge}>Hidden</span>
                            )}
                            <span className={styles.orderBadge}>#{project.order ?? 0}</span>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.info}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.projectYear}>
                                    {new Date(project.projectDate).getFullYear()}
                                    {project.gallery?.length ? ` · ${project.gallery.length} gallery` : ""}
                                </p>
                            </div>
                            <div className={styles.actions}>
                                <Link href={`/admin/projects/${project.id}/edit`} className={styles.iconBtn} title="Edit">
                                    <Edit size={18} />
                                </Link>
                                <form action={async () => {
                                    "use server";
                                    await toggleProjectVisibility(project.id, !project.isVisible);
                                }}>
                                    <button type="submit" className={styles.iconBtn} title={project.isVisible ? "Hide" : "Show"}>
                                        {project.isVisible ? <Eye size={18} /> : <EyeOff size={18} color="#ff4d4d" />}
                                    </button>
                                </form>
                                <form action={async () => {
                                    "use server";
                                    await deleteProject(project.id);
                                }}>
                                    <button type="submit" className={`${styles.iconBtn} ${styles.delete}`} title="Delete">
                                        <Trash2 size={18} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </GlassCard>
                ))}
                {allProjects.length === 0 && (
                    <p className={styles.empty}>No projects found. Start by adding one!</p>
                )}
            </div>
        </div>
    );
}
