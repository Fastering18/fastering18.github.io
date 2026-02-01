import GlassCard from "@/components/GlassCard";
import styles from "./Dashboard.module.css";
import { Briefcase, Code, FileText, Users } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { name: "Total Projects", value: "12", icon: Briefcase, color: "var(--accent-purple)" },
        { name: "Skills Listed", value: "32", icon: Code, color: "var(--accent-blue)" },
        { name: "Blog Posts", value: "5", icon: FileText, color: "#10b981" },
        { name: "Visible Sections", value: "6/8", icon: Users, color: "#f59e0b" },
    ];

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1 className={styles.title}>Dashboard Overview</h1>
                <p className={styles.subtitle}>Welcome back, Admin. Here's what's happening with your portfolio.</p>
            </header>

            <div className={styles.statsGrid}>
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <GlassCard key={stat.name} className={styles.statCard}>
                            <div className={styles.statIcon} style={{ backgroundColor: stat.color }}>
                                <Icon size={24} color="#fff" />
                            </div>
                            <div className={styles.statInfo}>
                                <span className={styles.statName}>{stat.name}</span>
                                <span className={styles.statValue}>{stat.value}</span>
                            </div>
                        </GlassCard>
                    );
                })}
            </div>

            <div className={styles.recentActivity}>
                <h2 className={styles.sectionTitle}>Recent Activity</h2>
                <GlassCard className={styles.activityCard}>
                    <p className={styles.placeholder}>No recent activity to show.</p>
                </GlassCard>
            </div>
        </div>
    );
}
