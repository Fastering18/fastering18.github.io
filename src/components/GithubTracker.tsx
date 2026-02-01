"use client";

import { useState, useEffect } from "react";
import { GitHubCalendar } from 'react-github-calendar';
import AnimatedSection from "@/components/AnimatedSection";
import styles from "./GithubTracker.module.css";

export default function GithubTracker() {
    const [mounted, setMounted] = useState(false);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
        setMounted(true);
    }, []);

    const years = [2025, 2024, 2023, 2022, 2021, 2020];

    return (
        <AnimatedSection className={styles.tracker}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.titleInfo}>
                        <h3 className={styles.title}>Contribution Graph</h3>
                        <p className={styles.subtitle}>My open source activity on GitHub</p>
                    </div>
                    <div className={styles.yearSelector}>
                        {years.map(year => (
                            <button
                                key={year}
                                className={`${styles.yearBtn} ${selectedYear === year ? styles.activeYear : ""}`}
                                onClick={() => setSelectedYear(year)}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.calendarWrapper}>
                    {mounted ? (
                        <GitHubCalendar
                            username="Fastering18"
                            year={selectedYear}
                            blockSize={12}
                            blockMargin={4}
                            colorScheme="dark"
                            fontSize={14}
                            theme={{
                                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                            }}
                        />
                    ) : (
                        <div style={{ height: "160px" }} /> // Placeholder to prevent jump
                    )}
                </div>
            </div>
        </AnimatedSection>
    );
}
