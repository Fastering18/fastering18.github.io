"use client";

import { useState } from "react";
import styles from "./ProjectEditorForm.module.css";
import GlassCard from "@/components/GlassCard";
import MagneticButton from "@/components/MagneticButton";
import { Plus, Trash2, Save } from "lucide-react";

export default function ProjectEditorForm({ project, action }: { project: any, action: (formData: FormData) => Promise<void> }) {
    const [links, setLinks] = useState<any[]>(project.links || []);

    const addLink = () => {
        setLinks([...links, { label: "", url: "", type: "external" }]);
    };

    const removeLink = (index: number) => {
        setLinks(links.filter((_, i) => i !== index));
    };

    const updateLink = (index: number, field: string, value: string) => {
        const newLinks = [...links];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setLinks(newLinks);
    };

    return (
        <form action={action} className={styles.form}>
            <input type="hidden" name="id" value={project.id} />
            <input type="hidden" name="links" value={JSON.stringify(links)} />

            <div className={styles.grid}>
                <div className={styles.mainInfo}>
                    <GlassCard className={styles.card}>
                        <div className={styles.field}>
                            <label>Project Title</label>
                            <input type="text" name="title" defaultValue={project.title} required />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Date</label>
                                <input type="date" name="projectDate" defaultValue={new Date(project.projectDate).toISOString().split('T')[0]} required />
                            </div>
                            <div className={styles.field}>
                                <label>Image URL</label>
                                <input type="text" name="image" defaultValue={project.image} required />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label>Tags (comma-separated)</label>
                            <input type="text" name="tags" defaultValue={project.tags.join(", ")} required />
                        </div>

                        <div className={styles.field}>
                            <label>Short Summary</label>
                            <input type="text" name="summary" defaultValue={project.summary} required />
                        </div>

                        <div className={styles.field}>
                            <label>Full Description</label>
                            <textarea name="description" defaultValue={project.description} rows={8} required />
                        </div>
                    </GlassCard>
                </div>

                <div className={styles.sidebar}>
                    <GlassCard className={styles.card}>
                        <div className={styles.linksHeader}>
                            <h3>Button Links</h3>
                            <button type="button" onClick={addLink} className={styles.addBtn}>
                                <Plus size={16} />
                                <span>Add Link</span>
                            </button>
                        </div>

                        <div className={styles.linksList}>
                            {links.map((link, index) => (
                                <div key={index} className={styles.linkItem}>
                                    <div className={styles.linkHeader}>
                                        <select
                                            value={link.type}
                                            onChange={(e) => updateLink(index, "type", e.target.value)}
                                        >
                                            <option value="external">External</option>
                                            <option value="github">GitHub</option>
                                            <option value="roblox">Roblox</option>
                                            <option value="web">Website</option>
                                        </select>
                                        <button type="button" onClick={() => removeLink(index)} className={styles.removeBtn}>
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Button Label"
                                        value={link.label}
                                        onChange={(e) => updateLink(index, "label", e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="URL"
                                        value={link.url}
                                        onChange={(e) => updateLink(index, "url", e.target.value)}
                                        required
                                    />
                                </div>
                            ))}
                            {links.length === 0 && (
                                <p className={styles.emptyLinks}>No links added.</p>
                            )}
                        </div>
                    </GlassCard>

                    <MagneticButton type="submit" variant="primary" className={styles.saveBtn}>
                        <Save size={20} />
                        <span>Save Changes</span>
                    </MagneticButton>
                </div>
            </div>
        </form>
    );
}
