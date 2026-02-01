"use client";

import { useState } from "react";
import { Plus, Eye, EyeOff, Trash2, Edit2 } from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/GlassCard";
import MagneticButton from "@/components/MagneticButton";
import SkillEditorForm from "./SkillEditorForm";
import styles from "../../(dashboard)/skills/Skills.module.css";
import { toggleSkillVisibility, deleteSkill } from "@/app/actions/skills";

interface Skill {
    id: number;
    name: string;
    category: string;
    iconUrl: string | null;
    isVisible: boolean | null;
    order: number | null;
}

interface SkillsManagerProps {
    initialSkills: Skill[];
}

export default function SkillsManager({ initialSkills }: SkillsManagerProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | undefined>(undefined);

    const categories = [...new Set(initialSkills.map(s => s.category))];

    const handleAdd = () => {
        setEditingSkill(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (skill: Skill) => {
        setEditingSkill(skill);
        setIsFormOpen(true);
    };

    return (
        <>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Manage Skills</h1>
                    <p className={styles.subtitle}>Organize and update your technical toolkit.</p>
                </div>
                <div onClick={handleAdd}>
                    <MagneticButton variant="primary">
                        <Plus size={20} />
                        <span>Add Skill</span>
                    </MagneticButton>
                </div>
            </header>

            {categories.map(category => (
                <div key={category} className={styles.categorySection}>
                    <h2 className={styles.categoryTitle}>{category}</h2>
                    <div className={styles.grid}>
                        {initialSkills.filter(s => s.category === category).map((skill) => (
                            <GlassCard key={skill.id} className={styles.skillCard}>
                                <div className={styles.skillIcon}>
                                    {skill.iconUrl && (
                                        <Image src={skill.iconUrl} alt={skill.name} width={24} height={24} />
                                    )}
                                </div>
                                <span className={styles.skillName}>{skill.name}</span>
                                <div className={styles.actions}>
                                    <button
                                        onClick={() => handleEdit(skill)}
                                        className={styles.iconBtn}
                                        title="Edit Skill"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <form action={async () => {
                                        await toggleSkillVisibility(skill.id, !skill.isVisible);
                                    }}>
                                        <button type="submit" className={styles.iconBtn}>
                                            {skill.isVisible ? <Eye size={16} /> : <EyeOff size={16} color="#ff4d4d" />}
                                        </button>
                                    </form>
                                    <form action={async () => {
                                        if (confirm("Are you sure you want to delete this skill?")) {
                                            await deleteSkill(skill.id);
                                        }
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

            {isFormOpen && (
                <SkillEditorForm
                    skill={editingSkill}
                    onClose={() => setIsFormOpen(false)}
                />
            )}
        </>
    );
}
