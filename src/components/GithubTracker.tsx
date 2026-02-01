"use client";

import { useState, useEffect } from "react";
import { GitHubCalendar } from 'react-github-calendar';
import AnimatedSection from "@/components/AnimatedSection";
import styles from "./GithubTracker.module.css";

export default function GithubTracker() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <AnimatedSection className={styles.tracker}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Contribution Graph</h3>
                    <p className={styles.subtitle}>My open source activity on GitHub</p>
                </div>

                <div className={styles.calendarWrapper}>
                    {mounted ? (
                        <GitHubCalendar
                            username="Fastering18"
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
