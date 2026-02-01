"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
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
                            Crafting Digital Experiences
                            <br />
                            <span className={styles.titleAccent}>with Code & Creativity</span>
                        </h2>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <p className={styles.description}>
                            I&apos;m a passionate Full Stack Developer with expertise in building modern web
                            applications and immersive game experiences. Proficient in{" "}
                            <strong>Node.js</strong>, <strong>Lua</strong>, and <strong>Python</strong>,
                            I specialize in performance optimization, accessibility, and minimalistic design.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                        <p className={styles.description}>
                            From developing complex Roblox games with thousands of players to building
                            Discord bots serving 300+ servers, I enjoy tackling challenging problems
                            and learning new technologies every day.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.5}>
                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>5+</span>
                                <span className={styles.statLabel}>Years Coding</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>10+</span>
                                <span className={styles.statLabel}>Projects</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>300+</span>
                                <span className={styles.statLabel}>Server Users</span>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
