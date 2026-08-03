import GlassCard from "@/components/GlassCard";
import styles from "./Dashboard.module.css";
import { Briefcase, Code, Eye, Users, BarChart3 } from "lucide-react";
import { getProjects } from "@/app/actions/projects";
import { getSkills } from "@/app/actions/skills";
import { getAnalyticsSnapshot } from "@/lib/analytics/stats";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const [projects, skills, analytics] = await Promise.all([
        getProjects(),
        getSkills(),
        getAnalyticsSnapshot(30).catch(() => null),
    ]);

    const visibleProjects = projects.filter((p) => p.isVisible).length;
    const visibleSkills = skills.filter((s) => s.isVisible).length;

    const stats = [
        {
            name: "Projects",
            value: `${visibleProjects}/${projects.length}`,
            icon: Briefcase,
            color: "var(--accent-purple)",
        },
        {
            name: "Skills",
            value: `${visibleSkills}`,
            icon: Code,
            color: "var(--accent-blue)",
        },
        {
            name: "Total views",
            value: analytics ? analytics.totalViews.toLocaleString() : "-",
            icon: Eye,
            color: "#10b981",
        },
        {
            name: "Unique visitors",
            value: analytics ? analytics.uniqueVisitors.toLocaleString() : "-",
            icon: Users,
            color: "#f59e0b",
        },
    ];

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1 className={styles.title}>Dashboard Overview</h1>
                <p className={styles.subtitle}>
                    Welcome back. Portfolio content and private traffic at a glance.
                </p>
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
                <div className={styles.sectionHead}>
                    <h2 className={styles.sectionTitle}>Traffic (30 days)</h2>
                    <Link href="/admin/analytics" className={styles.linkBtn}>
                        <BarChart3 size={16} />
                        Open analytics
                    </Link>
                </div>
                <GlassCard className={styles.activityCard}>
                    {analytics ? (
                        <div className={styles.miniStats}>
                            <div>
                                <strong>{analytics.todayViews}</strong>
                                <span>today</span>
                            </div>
                            <div>
                                <strong>{analytics.last7DaysViews}</strong>
                                <span>last 7 days</span>
                            </div>
                            <div>
                                <strong>{analytics.uniqueSessions}</strong>
                                <span>sessions</span>
                            </div>
                            <div>
                                <strong>{analytics.byCountry[0]?.country || "n/a"}</strong>
                                <span>top country</span>
                            </div>
                        </div>
                    ) : (
                        <p className={styles.placeholder}>Analytics unavailable right now.</p>
                    )}
                </GlassCard>
            </div>
        </div>
    );
}
