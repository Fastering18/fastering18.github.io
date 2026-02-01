"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import styles from "./ProjectCard.module.css";

export interface Project {
    id: string | number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    year: string;
    link?: string | null;
    github?: string | null;
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
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
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                            <ExternalLink size={18} />
                        </a>
                    )}
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                            <Github size={18} />
                        </a>
                    )}
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.year}>{project.year}</span>
                    <ArrowUpRight size={20} className={styles.arrow} />
                </div>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags}>
                    {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.article>
    );
}
