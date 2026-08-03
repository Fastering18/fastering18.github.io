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
import JsonLd from "@/components/JsonLd";
import styles from "./ProjectDetails.module.css";
import { Metadata } from "next";
import {
    SITE_NAME,
    absoluteUrl,
    breadcrumbJsonLd,
    projectJsonLd,
    truncateMeta,
} from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
    try {
        const projects = await getProjects();
        return projects
            .filter((p) => p.isVisible)
            .map((p) => ({ id: String(p.id) }));
    } catch {
        return [];
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const project = await getProjectById(parseInt(id, 10));

    if (!project) {
        return {
            title: "Project Not Found",
            robots: { index: false, follow: true },
        };
    }

    const description = truncateMeta(
        project.summary ||
            project.description.replace(/##\s+/g, " ").replace(/\n+/g, " "),
        160
    );
    const url = absoluteUrl(`/projects/${project.id}`);
    const image = absoluteUrl(project.image);
    const title = project.title;

    return {
        title,
        description,
        keywords: [
            project.title,
            SITE_NAME,
            "Fastering18",
            ...project.tags,
            "portfolio project",
        ],
        authors: [{ name: SITE_NAME }],
        alternates: {
            canonical: `/projects/${project.id}`,
        },
        openGraph: {
            title: `${title} | ${SITE_NAME}`,
            description,
            url,
            type: "article",
            siteName: `${SITE_NAME} Portfolio`,
            publishedTime: new Date(project.projectDate).toISOString(),
            authors: [SITE_NAME],
            tags: project.tags,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: `${project.title} preview`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${SITE_NAME}`,
            description,
            creator: "@FasteringDev",
            images: [image],
        },
        robots: {
            index: project.isVisible !== false,
            follow: true,
            googleBot: {
                index: project.isVisible !== false,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

export default async function ProjectDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = await getProjectById(parseInt(id, 10));
    const allProjects = await getProjects();
    const otherProjects = allProjects
        .filter((p) => p.id !== parseInt(id, 10) && p.isVisible)
        .slice(0, 5);

    if (!project) {
        notFound();
    }

    const gallery = Array.from(
        new Set(
            [project.image, ...((project.gallery as string[] | null) || [])].filter(
                Boolean
            )
        )
    );

    const formattedDate = new Date(project.projectDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
    });

    const links =
        (project.links as { label: string; url: string; type?: string }[] | null) ||
        [];

    return (
        <>
            <JsonLd
                data={[
                    projectJsonLd({
                        id: project.id,
                        title: project.title,
                        summary: project.summary,
                        description: project.description,
                        image: project.image,
                        tags: project.tags,
                        projectDate: project.projectDate,
                        links,
                    }),
                    breadcrumbJsonLd([
                        { name: "Home", path: "/" },
                        { name: "Projects", path: "/#projects" },
                        { name: project.title, path: `/projects/${project.id}` },
                    ]),
                ]}
            />
            <Navigation />
            <main className={styles.main} id="main-content">
                <div className={styles.bgGlow} />

                <div className={styles.container}>
                    <nav aria-label="Breadcrumb">
                        <Link href="/#projects" className={styles.backBtn}>
                            <ArrowLeft size={20} aria-hidden />
                            <span>Back to Projects</span>
                        </Link>
                    </nav>

                    <div className={styles.layout}>
                        <article className={styles.content} itemScope itemType="https://schema.org/CreativeWork">
                            <AnimatedSection>
                                <header className={styles.projectHeader}>
                                    <div className={styles.meta}>
                                        <div className={styles.year}>
                                            <Calendar size={16} aria-hidden />
                                            <time
                                                dateTime={new Date(project.projectDate).toISOString()}
                                                itemProp="datePublished"
                                            >
                                                {formattedDate}
                                            </time>
                                        </div>
                                        <div className={styles.tags}>
                                            {project.tags.map((tag) => (
                                                <span key={tag} className={styles.tag} itemProp="keywords">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <h1 className={styles.title} itemProp="name">
                                        {project.title}
                                    </h1>
                                    {project.summary && (
                                        <p className={styles.summary} itemProp="description">
                                            {project.summary}
                                        </p>
                                    )}
                                </header>

                                <ProjectGallery images={gallery} title={project.title} />

                                <div className={styles.info}>
                                    <div className={styles.sectionHead}>
                                        <Layers size={20} aria-hidden />
                                        <h2 className={styles.sectionTitle}>Case Study</h2>
                                    </div>
                                    <div itemProp="about">
                                        <ProjectDescription content={project.description} />
                                    </div>

                                    <div className={styles.actions}>
                                        {links.map((link, idx) => {
                                            const isRoblox =
                                                link.url.includes("roblox.com") ||
                                                link.type === "roblox";
                                            const isGithub =
                                                link.url.includes("github.com") ||
                                                link.type === "github";

                                            return (
                                                <a
                                                    key={idx}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    itemProp="url"
                                                >
                                                    <MagneticButton
                                                        className={
                                                            idx === 0
                                                                ? styles.primaryBtn
                                                                : styles.secondaryBtn
                                                        }
                                                    >
                                                        {isRoblox ? (
                                                            <Gamepad2 size={20} aria-hidden />
                                                        ) : isGithub ? (
                                                            <Github size={20} aria-hidden />
                                                        ) : (
                                                            <ExternalLink size={20} aria-hidden />
                                                        )}
                                                        <span>{link.label}</span>
                                                    </MagneticButton>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </AnimatedSection>
                        </article>

                        <aside className={styles.sidebar} aria-label="Project sidebar">
                            <GlassCard className={styles.sidebarCard}>
                                <h3 className={styles.sidebarTitle}>Project Stack</h3>
                                <div className={styles.sidebarTags}>
                                    {project.tags.map((tag) => (
                                        <span key={tag} className={styles.sidebarTag}>
                                            {tag}
                                        </span>
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
                                    {otherProjects.map((p) => (
                                        <Link
                                            key={p.id}
                                            href={`/projects/${p.id}`}
                                            className={styles.miniCard}
                                        >
                                            <div className={styles.miniImage}>
                                                <Image
                                                    src={p.image}
                                                    alt={`${p.title} thumbnail`}
                                                    fill
                                                    sizes="60px"
                                                />
                                            </div>
                                            <div className={styles.miniInfo}>
                                                <span className={styles.miniTitle}>{p.title}</span>
                                                <span className={styles.miniYear}>
                                                    {new Date(p.projectDate).getFullYear()}
                                                </span>
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
