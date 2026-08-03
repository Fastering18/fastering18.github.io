"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";
import styles from "./About.module.css";

export default function About() {
    const [clickCount, setClickCount] = useState(0);
    const router = useRouter();

    const handlePhotoClick = () => {
        const nextCount = clickCount + 1;
        if (nextCount >= 5) {
            router.push("/admin/login");
        } else {
            setClickCount(nextCount);
        }
    };

    return (
        <section id="about" className={styles.about}>
            <div className={styles.container}>
                <AnimatedSection>
                    <div
                        className={styles.imageWrapper}
                        onClick={handlePhotoClick}
                        style={{ cursor: "pointer" }}
                    >
                        <div className={styles.imageGlow} />
                        <div className={styles.imageFrame}>
                            <Image
                                src="/images/profile.png"
                                alt="Muhammad Brahmana Priambudi"
                                width={300}
                                height={300}
                                className={styles.image}
                                priority
                            />
                        </div>
                        <div className={styles.statusBadge}>
                            <span className={styles.statusDot} />
                            <span>Based in Indonesia</span>
                        </div>
                    </div>
                </AnimatedSection>

                <div className={styles.content}>
                    <AnimatedSection delay={0.1}>
                        <span className={styles.label}>About Me</span>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <h2 className={styles.title}>
                            Systems that players feel
                            <br />
                            <span className={styles.titleAccent}>and teams can ship</span>
                        </h2>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <p className={styles.description}>
                            I&apos;m <strong>Fastering18</strong>, a full stack developer who spends
                            most days in <strong>Luau</strong>, <strong>Node.js</strong>, and{" "}
                            <strong>TypeScript</strong>. On Roblox I own Knit services, economies,
                            monetization, and admin tooling. On the web I build fast Next.js apps
                            with clear UX and durable backends.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                        <p className={`${styles.description} ${styles.secondaryBio}`}>
                            Recent work spans underwater brainrot tycoons, free UGC co-op loops
                            past 200K visits, campus digital twins, and Discord bridges that hit
                            300+ servers. I care about retention loops, cross-platform input, and
                            code that stays editable after launch week.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.5}>
                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <CountUp end={5} suffix="+" className={styles.statNumber} duration={1400} />
                                <span className={styles.statLabel}>Years Coding</span>
                            </div>
                            <div className={styles.stat}>
                                <CountUp end={8} suffix="+" className={styles.statNumber} duration={1600} />
                                <span className={styles.statLabel}>Shipped Games</span>
                            </div>
                            <div className={styles.stat}>
                                <CountUp end={200000} suffix="+" compact className={styles.statNumber} duration={2000} />
                                <span className={styles.statLabel}>Roblox Visits</span>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
