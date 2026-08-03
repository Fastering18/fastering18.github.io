import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAnalyticsSnapshot } from "@/lib/analytics/stats";
import GlassCard from "@/components/GlassCard";
import styles from "./Analytics.module.css";
import { Eye, Users, CalendarDays, Activity } from "lucide-react";

export const dynamic = "force-dynamic";

function BarList({
    items,
    labelKey,
    valueKey,
}: {
    items: Record<string, string | number>[];
    labelKey: string;
    valueKey: string;
}) {
    const max = Math.max(1, ...items.map((i) => Number(i[valueKey]) || 0));
    return (
        <div className={styles.barList}>
            {items.length === 0 && <p className={styles.empty}>No data yet.</p>}
            {items.map((item) => {
                const label = String(item[labelKey]);
                const value = Number(item[valueKey]) || 0;
                const pct = Math.round((value / max) * 100);
                return (
                    <div key={label} className={styles.barRow}>
                        <div className={styles.barMeta}>
                            <span className={styles.barLabel}>{label}</span>
                            <span className={styles.barValue}>{value.toLocaleString()}</span>
                        </div>
                        <div className={styles.barTrack}>
                            <div className={styles.barFill} style={{ width: `${pct}%` }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default async function AnalyticsPage() {
    const session = await auth();
    if (!session) redirect("/admin/login");

    const data = await getAnalyticsSnapshot(30);
    const maxDay = Math.max(1, ...data.byDay.map((d) => d.views));

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Visitor Analytics</h1>
                    <p className={styles.subtitle}>
                        Private traffic insights for this portfolio. Data is not shown on the public site.
                    </p>
                </div>
            </header>

            <div className={styles.kpiGrid}>
                <GlassCard className={styles.kpi}>
                    <div className={styles.kpiIcon}><Eye size={20} /></div>
                    <div>
                        <span className={styles.kpiLabel}>Total views</span>
                        <span className={styles.kpiValue}>{data.totalViews.toLocaleString()}</span>
                    </div>
                </GlassCard>
                <GlassCard className={styles.kpi}>
                    <div className={styles.kpiIcon}><Users size={20} /></div>
                    <div>
                        <span className={styles.kpiLabel}>Unique visitors</span>
                        <span className={styles.kpiValue}>{data.uniqueVisitors.toLocaleString()}</span>
                    </div>
                </GlassCard>
                <GlassCard className={styles.kpi}>
                    <div className={styles.kpiIcon}><CalendarDays size={20} /></div>
                    <div>
                        <span className={styles.kpiLabel}>Today</span>
                        <span className={styles.kpiValue}>{data.todayViews.toLocaleString()}</span>
                    </div>
                </GlassCard>
                <GlassCard className={styles.kpi}>
                    <div className={styles.kpiIcon}><Activity size={20} /></div>
                    <div>
                        <span className={styles.kpiLabel}>Last 7 days</span>
                        <span className={styles.kpiValue}>{data.last7DaysViews.toLocaleString()}</span>
                    </div>
                </GlassCard>
            </div>

            <GlassCard className={styles.panel}>
                <h2 className={styles.panelTitle}>Visits by day (30d)</h2>
                <div className={styles.chart}>
                    {data.byDay.length === 0 && <p className={styles.empty}>No visits recorded yet. Open the public site to start logging.</p>}
                    {data.byDay.map((d) => (
                        <div key={d.date} className={styles.chartCol} title={`${d.date}: ${d.views} views, ${d.visitors} visitors`}>
                            <div
                                className={styles.chartBar}
                                style={{ height: `${Math.max(4, (d.views / maxDay) * 100)}%` }}
                            />
                            <span className={styles.chartLabel}>{d.date.slice(5)}</span>
                        </div>
                    ))}
                </div>
            </GlassCard>

            <div className={styles.grid2}>
                <GlassCard className={styles.panel}>
                    <h2 className={styles.panelTitle}>Countries</h2>
                    <BarList items={data.byCountry as any} labelKey="country" valueKey="views" />
                </GlassCard>
                <GlassCard className={styles.panel}>
                    <h2 className={styles.panelTitle}>Devices</h2>
                    <BarList items={data.byDevice as any} labelKey="device" valueKey="views" />
                </GlassCard>
                <GlassCard className={styles.panel}>
                    <h2 className={styles.panelTitle}>Browsers</h2>
                    <BarList items={data.byBrowser as any} labelKey="browser" valueKey="views" />
                </GlassCard>
                <GlassCard className={styles.panel}>
                    <h2 className={styles.panelTitle}>Operating systems</h2>
                    <BarList items={data.byOs as any} labelKey="os" valueKey="views" />
                </GlassCard>
                <GlassCard className={styles.panel}>
                    <h2 className={styles.panelTitle}>Languages</h2>
                    <BarList items={data.byLanguage as any} labelKey="language" valueKey="views" />
                </GlassCard>
                <GlassCard className={styles.panel}>
                    <h2 className={styles.panelTitle}>Top pages</h2>
                    <BarList items={data.byPath as any} labelKey="path" valueKey="views" />
                </GlassCard>
            </div>

            <GlassCard className={styles.panel}>
                <h2 className={styles.panelTitle}>Recent visits</h2>
                <div className={styles.tableWrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>When (UTC)</th>
                                <th>Path</th>
                                <th>Country</th>
                                <th>City</th>
                                <th>Device</th>
                                <th>Browser</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.recent.length === 0 && (
                                <tr>
                                    <td colSpan={6} className={styles.empty}>No events yet.</td>
                                </tr>
                            )}
                            {data.recent.map((r) => (
                                <tr key={r.id}>
                                    <td>{r.createdAt ? new Date(r.createdAt).toISOString().replace("T", " ").slice(0, 19) : "n/a"}</td>
                                    <td className={styles.mono}>{r.path}</td>
                                    <td>{r.country || "n/a"}</td>
                                    <td>{r.city || "n/a"}</td>
                                    <td>{r.device || "n/a"}</td>
                                    <td>{r.browser || "n/a"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
}
