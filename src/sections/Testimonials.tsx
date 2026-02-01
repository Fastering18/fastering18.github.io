"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
    return (
        <section id="testimonials" className={styles.testimonials}>
            <div className={styles.container}>
                <AnimatedSection className={styles.header}>
                    <span className={styles.label}>Wall of Love</span>
                    <h2 className={styles.title}>Testimonials</h2>
                </AnimatedSection>

                <div className={styles.comingSoon}>
                    <div className={styles.glassCard}>
                        <motion.div
                            className={styles.text}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Coming Soon
                        </motion.div>
                        <p className={styles.description}>
                            I&apos;m currently gathering feedback from my clients and collaborators. Stay tuned!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
