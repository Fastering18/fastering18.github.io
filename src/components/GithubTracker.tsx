"use client";

import { GitHubCalendar } from 'react-github-calendar';
import AnimatedSection from "@/components/AnimatedSection";
import styles from "./GithubTracker.module.css";

export default function GithubTracker() {
    return (
        <AnimatedSection className={styles.tracker}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Contribution Graph</h3>
                    <p className={styles.subtitle}>My open source activity on GitHub</p>
                </div>

                <div className={styles.calendarWrapper}>
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
                </div>
            </div>
        </AnimatedSection>
    );
}
