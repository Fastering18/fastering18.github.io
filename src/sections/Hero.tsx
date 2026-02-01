"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section id="home" className={styles.hero}>
            <div className={styles.background}>
                <div className={styles.blob1} />
                <div className={styles.blob2} />
                <div className={styles.blob3} />
                <div className={styles.grid} />
            </div>

            <div className={styles.content}>
                <motion.div
                    className={styles.badge}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Sparkles size={14} />
                    <span>Available for projects</span>
                </motion.div>

                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <span className={styles.line}>Hi, I&apos;m</span>
                    <span className={styles.name}>Muhammad Brahmana</span>
                    <span className={styles.role}>Full Stack Developer</span>
                </motion.h1>

                <motion.p
                    className={styles.description}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    Building modern web applications and immersive game experiences.
                    <br />
                    Specializing in <span className={styles.highlight}>performance</span>,{" "}
                    <span className={styles.highlight}>accessibility</span>, and{" "}
                    <span className={styles.highlight}>stunning design</span>.
                </motion.p>

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
