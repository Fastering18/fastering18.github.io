import AnimatedSection from "@/components/AnimatedSection";
import SkillBadge from "@/components/SkillBadge";
import GithubTracker from "@/components/GithubTracker";
import { getSkills } from "@/app/actions/skills";
import styles from "./Skills.module.css";

export default async function Skills() {
    const allSkills = await getSkills();
    const visibleSkills = allSkills.filter(s => s.isVisible);

    // Group skills by category
    const groupedSkills = visibleSkills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, typeof visibleSkills>);

    return (
        <section id="skills" className={styles.skills}>
            <div className={styles.container}>
                <AnimatedSection className={styles.header}>
                    <span className={styles.label}>Activity & Expertise</span>
                    <h2 className={styles.title}>Skills & Contributions</h2>
                    <p className={styles.subtitle}>
                        My journey in code, verified by contributions and technical proficiency.
                    </p>
                </AnimatedSection>

                <GithubTracker />

                <div className={styles.categories}>
                    {Object.entries(groupedSkills).map(([categoryName, skills], categoryIndex) => (
                        <AnimatedSection key={categoryName} delay={categoryIndex * 0.1}>
                            <div className={styles.category}>
                                <h3 className={styles.categoryName}>{categoryName}</h3>
                                <div className={styles.badges}>
                                    {skills.map((skill, skillIndex) => (
                                        <SkillBadge
                                            key={skill.name}
                                            name={skill.name}
                                            iconUrl={skill.iconUrl || undefined}
                                            index={skillIndex}
                                        />
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
