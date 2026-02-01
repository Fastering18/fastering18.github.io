"use client";

import { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import MagneticButton from "@/components/MagneticButton";
import styles from "./SkillEditorForm.module.css";
import { addSkill, updateSkill } from "@/app/actions/skills";

interface Skill {
    id?: number;
    name: string;
    category: string;
    iconUrl: string | null;
    isVisible: boolean | null;
    order: number | null;
}

interface SkillEditorFormProps {
    skill?: Skill;
    onClose: () => void;
}

export default function SkillEditorForm({ skill, onClose }: SkillEditorFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Skill>(
        skill || {
            name: "",
            category: "Frontend",
            iconUrl: "",
            isVisible: true,
            order: 0,
        }
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (skill?.id) {
                await updateSkill(skill.id, formData);
            } else {
                await addSkill(formData as any);
            }
            onClose();
        } catch (error) {
            console.error("Failed to save skill:", error);
            alert("Failed to save skill. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <GlassCard className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{skill ? "Edit Skill" : "Add New Skill"}</h2>
                    <button onClick={onClose} className={styles.closeBtn}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.group}>
                        <label>Skill Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Next.js"
                        />
                    </div>

                    <div className={styles.group}>
                        <label>Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Game Dev">Game Dev</option>
                            <option value="Tools">Tools</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className={styles.group}>
                        <label>Icon URL (Lucide name or Image path)</label>
                        <input
                            type="text"
                            value={formData.iconUrl || ""}
                            onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
                            placeholder="/icons/nextjs.svg"
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.group}>
                            <label>Order</label>
                            <input
                                type="number"
                                value={formData.order || 0}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className={styles.toggleGroup}>
                            <label>Visible</label>
                            <input
                                type="checkbox"
                                checked={formData.isVisible || false}
                                onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                            />
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <button type="button" onClick={onClose} className={styles.cancelBtn}>
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className={styles.saveBtn}>
                            {loading ? <Loader2 size={18} className={styles.spin} /> : <Save size={18} />}
                            <span>{skill ? "Update Skill" : "Create Skill"}</span>
                        </button>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
}
