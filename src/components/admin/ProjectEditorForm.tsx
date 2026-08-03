"use client";

import { useState } from "react";
import styles from "./ProjectEditorForm.module.css";
import GlassCard from "@/components/GlassCard";
import MagneticButton from "@/components/MagneticButton";
import { Plus, Trash2, Save, Image as ImageIcon, Eye, EyeOff } from "lucide-react";

export default function ProjectEditorForm({
    project,
    action,
    submitLabel = "Save Changes",
}: {
    project: any;
    action: (formData: FormData) => Promise<void>;
    submitLabel?: string;
}) {
    const [links, setLinks] = useState<any[]>(project.links || []);
    const [galleryText, setGalleryText] = useState(
        Array.isArray(project.gallery) ? project.gallery.join("\n") : ""
    );
    const [isVisible, setIsVisible] = useState(project.isVisible !== false);
    const [order, setOrder] = useState(project.order ?? 0);

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
            {project.id != null && project.id !== "" && (
                <input type="hidden" name="id" value={project.id} />
            )}
            <input type="hidden" name="links" value={JSON.stringify(links)} />
            <input type="hidden" name="gallery" value={galleryText} />
            <input type="hidden" name="isVisible" value={isVisible ? "true" : "false"} />
            <input type="hidden" name="order" value={String(order)} />

            <div className={styles.grid}>
                <div className={styles.mainInfo}>
                    <GlassCard className={styles.card}>
                        <div className={styles.field}>
                            <label htmlFor="title">Project Title</label>
                            <input id="title" type="text" name="title" defaultValue={project.title || ""} required />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label htmlFor="projectDate">Date</label>
                                <input
                                    id="projectDate"
                                    type="date"
                                    name="projectDate"
                                    defaultValue={
                                        project.projectDate
                                            ? new Date(project.projectDate).toISOString().split("T")[0]
                                            : new Date().toISOString().split("T")[0]
                                    }
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="image">Cover Image URL</label>
                                <input
                                    id="image"
                                    type="text"
                                    name="image"
                                    defaultValue={project.image || ""}
                                    placeholder="/images/projects/cover.png"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="tags">Tags (comma-separated)</label>
                            <input
                                id="tags"
                                type="text"
                                name="tags"
                                defaultValue={Array.isArray(project.tags) ? project.tags.join(", ") : ""}
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="summary">Short Summary</label>
                            <input
                                id="summary"
                                type="text"
                                name="summary"
                                defaultValue={project.summary || ""}
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="description">
                                Full Description (supports ## headings and - bullets)
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                defaultValue={project.description || ""}
                                rows={14}
                                required
                                className={styles.tall}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="gallery">
                                <ImageIcon size={14} style={{ display: "inline", marginRight: 6 }} />
                                Gallery images (one path or URL per line)
                            </label>
                            <textarea
                                id="gallery"
                                value={galleryText}
                                onChange={(e) => setGalleryText(e.target.value)}
                                rows={5}
                                placeholder={"/images/projects/shot-1.png\n/images/projects/shot-2.png"}
                            />
                            <p className={styles.hint}>
                                Cover image is always included automatically on the public page.
                            </p>
                        </div>
                    </GlassCard>
                </div>

                <div className={styles.sidebar}>
                    <GlassCard className={styles.card}>
                        <div className={styles.field}>
                            <label htmlFor="order">Display Order (higher first)</label>
                            <input
                                id="order"
                                type="number"
                                value={order}
                                onChange={(e) => setOrder(parseInt(e.target.value || "0", 10))}
                            />
                        </div>

                        <button
                            type="button"
                            className={`${styles.visibilityToggle} ${isVisible ? styles.visible : styles.hidden}`}
                            onClick={() => setIsVisible(!isVisible)}
                        >
                            {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                            <span>{isVisible ? "Visible on site" : "Hidden from site"}</span>
                        </button>
                    </GlassCard>

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
                        <span>{submitLabel}</span>
                    </MagneticButton>
                </div>
            </div>
        </form>
    );
}
