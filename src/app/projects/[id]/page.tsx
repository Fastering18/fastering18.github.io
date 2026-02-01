import { getProjectById, getProjects } from "@/app/actions/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Calendar, ArrowLeft, Gamepad2 } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import GlassCard from "@/components/GlassCard";
import AnimatedSection from "@/components/AnimatedSection";
import styles from "./ProjectDetails.module.css";
import { Metadata } from "next";

export async function generateMetadata({
    params
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params;
    const project = await getProjectById(parseInt(id));

    if (!project) return { title: "Project Not Found" };

    return {
        title: `${project.title} | Muhammad Brahmana Priambudi`,
        description: project.summary || project.description.substring(0, 160),
        openGraph: {
            images: [project.image],
        },
    };
}

export default async function ProjectDetails({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const project = await getProjectById(parseInt(id));
    const allProjects = await getProjects();
    const otherProjects = allProjects.filter(p => p.id !== parseInt(id) && p.isVisible).slice(0, 5);

    if (!project) {
        notFound();
    }

    const isRoblox = (project.links as any[])?.some(l => l.url.includes("roblox.com"));

    return (
        <main className={styles.main}>
            {/* Background decoration */}
            <div className={styles.bgGlow} />

            <div className={styles.container}>
                <Link href="/#projects" className={styles.backBtn}>
                    <ArrowLeft size={20} />
                    <span>Back to Projects</span>
                </Link>

                <div className={styles.layout}>
                    {/* Content Section */}
                    <div className={styles.content}>
                        <AnimatedSection>
                            <div className={styles.projectHeader}>
                                <div className={styles.meta}>
                                    <div className={styles.year}>
                                        <Calendar size={16} />
                                        <span>{new Date(project.projectDate).getFullYear()}</span>
                                    </div>
                                    <div className={styles.tags}>
                                        {project.tags.map(tag => (
                                            <span key={tag} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <h1 className={styles.title}>{project.title}</h1>
                            </div>

                            <div className={styles.imageWrapper}>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className={styles.image}
                                    priority
                                />
                            </div>

                            <div className={styles.info}>
                                <h2 className={styles.sectionTitle}>About the Project</h2>
                                <p className={styles.description}>{project.description}</p>

                                <div className={styles.actions}>
                                    {(project.links as any[])?.map((link, idx) => {
                                        const isRoblox = link.url.includes("roblox.com");
                                        const isGithub = link.url.includes("github.com") || link.type === "github";

                                        return (
                                            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
                                                <MagneticButton className={idx === 0 ? styles.primaryBtn : styles.secondaryBtn}>
                                                    {isRoblox ? <Gamepad2 size={20} /> : isGithub ? <Github size={20} /> : <ExternalLink size={20} />}
                                                    <span>{link.label}</span>
                                                </MagneticButton>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Sidebar Section */}
                    <aside className={styles.sidebar}>
                        <GlassCard className={styles.sidebarCard}>
                            <h3 className={styles.sidebarTitle}>Other Projects</h3>
                            <div className={styles.otherProjects}>
                                {otherProjects.map(p => (
                                    <Link key={p.id} href={`/projects/${p.id}`} className={styles.miniCard}>
                                        <div className={styles.miniImage}>
                                            <Image src={p.image} alt={p.title} fill />
                                        </div>
                                        <div className={styles.miniInfo}>
                                            <span className={styles.miniTitle}>{p.title}</span>
                                            <span className={styles.miniYear}>{new Date(p.projectDate).getFullYear()}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </GlassCard>
                    </aside>
                </div>
            </div>
        </main>
    );
}
