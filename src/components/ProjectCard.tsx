"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import styles from "./ProjectCard.module.css";

export interface Project {
    id: string | number;
    title: string;
    summary?: string | null;
    description: string;
    image: string;
    tags: string[];
    projectDate: Date | string;
    links: any;
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <Link href={`/projects/${project.id}`} className={styles.cardLink}>
            <motion.article
                className={styles.card}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
            >
                <div className={styles.imageWrapper}>
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.image}
                    />
                    <div className={styles.imageOverlay} />
                    <div className={styles.actions}>
                        {project.links && project.links.length > 0 && (
                            <div className={styles.actionBtn}>
                                <ArrowUpRight size={18} />
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.header}>
                        <span className={styles.year}>{new Date(project.projectDate).getFullYear()}</span>
                        <ArrowUpRight size={20} className={styles.arrow} />
                    </div>
                    <h3 className={styles.title}>{project.title}</h3>
                    <p className={styles.description}>{project.summary}</p>
                    <div className={styles.tags}>
                        {project.tags.map((tag) => (
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
