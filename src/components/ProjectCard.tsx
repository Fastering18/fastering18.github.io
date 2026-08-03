"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./ProjectCard.module.css";

export interface Project {
    id: string | number;
    title: string;
    summary?: string | null;
    description: string;
    image: string;
    gallery?: string[] | null;
    tags: string[];
    projectDate: Date | string;
    links: unknown;
}

interface ProjectCardProps {
    project: Project;
    index: number;
    featured?: boolean;
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
    const year = new Date(project.projectDate).getFullYear();
    const isGif = project.image.toLowerCase().endsWith(".gif");

    return (
        <Link
            href={`/projects/${project.id}`}
            className={`${styles.cardLink} ${featured ? styles.featuredLink : ""}`}
        >
            <motion.article
                className={`${styles.card} ${featured ? styles.featured : ""}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3), ease: "easeOut" }}
                whileHover={{ y: -4 }}
            >
                <div className={styles.imageWrapper}>
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes={
                            featured
                                ? "(max-width: 768px) 100vw, 66vw"
                                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        }
                        className={styles.image}
                        unoptimized={isGif}
                    />
                    <div className={styles.imageOverlay} />
                    <div className={styles.badgeRow}>
                        <span className={styles.year}>{year}</span>
                        {featured && <span className={styles.featuredBadge}>Featured</span>}
                    </div>
                    <div className={styles.actions}>
                        <div className={styles.actionBtn} aria-hidden>
                            <ArrowUpRight size={18} />
                        </div>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.header}>
                        <h3 className={styles.title}>{project.title}</h3>
                        <ArrowUpRight size={20} className={styles.arrow} />
                    </div>
                    <p className={styles.description}>{project.summary}</p>
                    <div className={styles.tags}>
                        {project.tags.slice(0, featured ? 5 : 4).map((tag) => (
                            <span key={tag} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}
