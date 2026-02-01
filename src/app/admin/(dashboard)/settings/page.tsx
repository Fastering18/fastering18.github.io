import { getConfig, updateConfig } from "@/app/actions/config";
import GlassCard from "@/components/GlassCard";
import MagneticButton from "@/components/MagneticButton";
import styles from "./Settings.module.css";
import { Save, Globe, Shield, Layout } from "lucide-react";

export default async function AdminSettingsPage() {
    const configData = await getConfig();

    const sections = [
        { id: "show_hero", label: "Show Hero Section" },
        { id: "show_about", label: "Show About Section" },
        { id: "show_skills", label: "Show Skills Section" },
        { id: "show_projects", label: "Show Projects Section" },
        { id: "show_github", label: "Show GitHub Tracker" },
        { id: "show_contact", label: "Show Contact Section" },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Site Settings</h1>
                <p className={styles.subtitle}>Configure global portfolio behavior and section visibility.</p>
            </header>

            <div className={styles.grid}>
                <GlassCard className={styles.card}>
                    <div className={styles.cardHeader}>
                        <Layout size={20} className={styles.icon} />
                        <h2>Section Visibility</h2>
                    </div>
                    <div className={styles.toggles}>
                        {sections.map((section) => (
                            <div key={section.id} className={styles.toggleRow}>
                                <span>{section.label}</span>
                                <form action={async (formData) => {
                                    "use server";
                                    const value = formData.get("value") === "true";
                                    await updateConfig(section.id, String(!value));
                                }}>
                                    <input type="hidden" name="value" value={configData[section.id] || "true"} />
                                    <button
                                        type="submit"
                                        className={`${styles.switch} ${configData[section.id] !== "false" ? styles.active : ""}`}
                                    />
                                </form>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className={styles.card}>
                    <div className={styles.cardHeader}>
                        <Globe size={20} className={styles.icon} />
                        <h2>Contact Links</h2>
                    </div>
                    <form className={styles.form} action={async (formData) => {
                        "use server";
                        await updateConfig("contact_email", String(formData.get("email")));
                    }}>
                        <div className={styles.inputGroup}>
                            <label>Email Address</label>
                            <input
                                name="email"
                                defaultValue={configData["contact_email"] || "yourname@example.com"}
                            />
                        </div>
                        <MagneticButton type="submit" variant="primary" className={styles.saveBtn}>
                            <Save size={18} />
                            <span>Save Changes</span>
                        </MagneticButton>
                    </form>
                </GlassCard>
            </div>
        </div>
    );
}
