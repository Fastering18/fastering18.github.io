import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/app/actions/projects";
import styles from "./Projects.module.css";

export default async function Projects() {
    const allProjects = await getProjects();
    const visibleProjects = allProjects.filter(p => p.isVisible);

    return (
        <section id="projects" className={styles.projects}>
            <div className={styles.container}>
                <AnimatedSection className={styles.header}>
                    <span className={styles.label}>My Work</span>
                    <h2 className={styles.title}>Featured Projects</h2>
                    <p className={styles.subtitle}>
                        A selection of projects I&apos;ve worked on, from web applications to game development.
                    </p>
                </AnimatedSection>

                <div className={styles.grid}>
                    {visibleProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project as any} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
