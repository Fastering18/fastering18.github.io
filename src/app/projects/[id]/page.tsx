import { getProjectById, getProjects } from "@/app/actions/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Calendar, ArrowLeft, Gamepad2, Layers } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import GlassCard from "@/components/GlassCard";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectDescription from "@/components/ProjectDescription";
import Navigation from "@/components/Navigation";
import Footer from "@/sections/Footer";
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

    const gallery = Array.from(
        new Set(
            [project.image, ...((project.gallery as string[] | null) || [])].filter(Boolean)
        )
    );

    const formattedDate = new Date(project.projectDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
    });

    return (
        <>
            <Navigation />
            <main className={styles.main}>
                <div className={styles.bgGlow} />

                <div className={styles.container}>
                    <Link href="/#projects" className={styles.backBtn}>
                        <ArrowLeft size={20} />
                        <span>Back to Projects</span>
                    </Link>

                    <div className={styles.layout}>
                        <div className={styles.content}>
                            <AnimatedSection>
                                <div className={styles.projectHeader}>
                                    <div className={styles.meta}>
                                        <div className={styles.year}>
                                            <Calendar size={16} />
                                            <span>{formattedDate}</span>
                                        </div>
                                        <div className={styles.tags}>
                                            {project.tags.map(tag => (
                                                <span key={tag} className={styles.tag}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <h1 className={styles.title}>{project.title}</h1>
                                    {project.summary && (
                                        <p className={styles.summary}>{project.summary}</p>
                                    )}
                                </div>

                                <ProjectGallery images={gallery} title={project.title} />

                                <div className={styles.info}>
                                    <div className={styles.sectionHead}>
                                        <Layers size={20} />
                                        <h2 className={styles.sectionTitle}>Case Study</h2>
                                    </div>
                                    <ProjectDescription content={project.description} />

                                    <div className={styles.actions}>
                                        {(project.links as { label: string; url: string; type?: string }[] | null)?.map((link, idx) => {
                                            const isRoblox = link.url.includes("roblox.com") || link.type === "roblox";
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

                        <aside className={styles.sidebar}>
                            <GlassCard className={styles.sidebarCard}>
                                <h3 className={styles.sidebarTitle}>Project Stack</h3>
                                <div className={styles.sidebarTags}>
                                    {project.tags.map(tag => (
                                        <span key={tag} className={styles.sidebarTag}>{tag}</span>
                                    ))}
                                </div>
                                <div className={styles.sidebarMeta}>
                                    <span className={styles.sidebarMetaLabel}>Shipped</span>
                                    <span className={styles.sidebarMetaValue}>{formattedDate}</span>
                                </div>
                            </GlassCard>

                            <GlassCard className={styles.sidebarCard}>
                                <h3 className={styles.sidebarTitle}>Other Projects</h3>
                                <div className={styles.otherProjects}>
                                    {otherProjects.map(p => (
                                        <Link key={p.id} href={`/projects/${p.id}`} className={styles.miniCard}>
                                            <div className={styles.miniImage}>
                                                <Image src={p.image} alt={p.title} fill sizes="60px" />
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
            <Footer />
        </>
    );
}
