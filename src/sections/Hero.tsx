"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import AnimatedSection from "@/components/AnimatedSection";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section id="home" className={styles.hero} aria-label="Introduction">
            <div className={styles.background} aria-hidden>
                <div className={styles.blob1} />
                <div className={styles.blob2} />
                <div className={styles.blob3} />
                <div className={styles.grid} />
                <div className={styles.noise} />
            </div>

            <div className={styles.content}>
                <motion.div
                    className={`${styles.badge} ${styles.available}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Sparkles size={14} aria-hidden />
                    <span>Available for projects</span>
                </motion.div>

                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <span className={styles.line}>Hi, I&apos;m</span>
                    <span className={styles.name}>Muhammad Brahmana Priambudi</span>
                    <span className={styles.role}>Fastering18 · Full Stack &amp; Roblox Systems Developer</span>
                </motion.h1>

                <AnimatedSection delay={0.4}>
                    <p className={styles.description}>
                        I&apos;m <strong>Fastering18</strong> (also Fastering / FasteringDev).
                        I ship player facing game systems and modern web apps with Knit services,
                        live economies, and clean TypeScript stacks that hold up under real traffic.
                    </p>
                </AnimatedSection>

                <motion.div
                    className={styles.pills}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                >
                    <span className={styles.pill}>Luau / Knit</span>
                    <span className={styles.pill}>Next.js</span>
                    <span className={styles.pill}>Node.js</span>
                    <span className={styles.pill}>Live Ops</span>
                </motion.div>

                <motion.div
                    className={styles.buttons}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <MagneticButton href="#projects" variant="primary">
                        View Projects
                    </MagneticButton>
                    <MagneticButton href="#contact" variant="secondary">
                        Get in Touch
                    </MagneticButton>
                </motion.div>
            </div>

            <motion.a
                href="#about"
                className={styles.scrollIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
            >
                <span>Scroll</span>
                <ArrowDown size={16} className={styles.arrowIcon} />
            </motion.a>
        </section>
    );
}
