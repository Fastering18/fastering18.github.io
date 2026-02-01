import { getSkills, toggleSkillVisibility, deleteSkill } from "@/app/actions/skills";
import GlassCard from "@/components/GlassCard";
import MagneticButton from "@/components/MagneticButton";
import styles from "./Skills.module.css";
import { Plus, Eye, EyeOff, Trash2 } from "lucide-react";
import Image from "next/image";

export default async function AdminSkillsPage() {
    const allSkills = await getSkills();
    const categories = [...new Set(allSkills.map(s => s.category))];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Manage Skills</h1>
                    <p className={styles.subtitle}>Organize and update your technical toolkit.</p>
                </div>
                <MagneticButton variant="primary">
                    <Plus size={20} />
                    <span>Add Skill</span>
                </MagneticButton>
            </header>

            {categories.map(category => (
                <div key={category} className={styles.categorySection}>
                    <h2 className={styles.categoryTitle}>{category}</h2>
                    <div className={styles.grid}>
                        {allSkills.filter(s => s.category === category).map((skill) => (
                            <GlassCard key={skill.id} className={styles.skillCard}>
                                <div className={styles.skillIcon}>
                                    {skill.iconUrl && (
                                        <Image src={skill.iconUrl} alt={skill.name} width={24} height={24} />
                                    )}
                                </div>
                                <span className={styles.skillName}>{skill.name}</span>
                                <div className={styles.actions}>
                                    <form action={async () => {
                                        "use server";
                                        await toggleSkillVisibility(skill.id, !skill.isVisible);
                                    }}>
                                        <button type="submit" className={styles.iconBtn}>
                                            {skill.isVisible ? <Eye size={16} /> : <EyeOff size={16} color="#ff4d4d" />}
                                        </button>
                                    </form>
                                    <form action={async () => {
                                        "use server";
                                        await deleteSkill(skill.id);
                                    }}>
                                        <button type="submit" className={`${styles.iconBtn} ${styles.delete}`}>
                                            <Trash2 size={16} />
                                        </button>
                                    </form>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
