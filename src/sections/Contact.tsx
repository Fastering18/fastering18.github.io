"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle, Twitter } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import MagneticButton from "@/components/MagneticButton";
import { socialLinks } from "@/data/skills";
import styles from "./Contact.module.css";

const iconMap: Record<string, typeof Github> = {
    github: Github,
    linkedin: Linkedin,
    discord: MessageCircle,
    twitter: Twitter,
};

export default function Contact() {
    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.glow} />

            <div className={styles.container}>
                <AnimatedSection className={styles.content}>
                    <span className={styles.label}>Get in Touch</span>
                    <h2 className={styles.title}>
                        Let&apos;s Work
                        <br />
                        <span className={styles.titleAccent}>Together</span>
                    </h2>
                    <p className={styles.description}>
                        Feel free to reach out if you have a project in mind, want to collaborate,
                        or just want to say hi. I&apos;m always open to discussing new opportunities.
                    </p>

                    <MagneticButton
                        href="mailto:brahmana@fastering.thedev.id"
                        variant="primary"
                        className={styles.emailBtn}
                    >
                        <Mail size={18} />
                        <span>Send an Email</span>
                    </MagneticButton>
                </AnimatedSection>

                <AnimatedSection delay={0.2} className={styles.socials}>
                    <p className={styles.socialsLabel}>Or find me on</p>
                    <div className={styles.socialLinks}>
                        {socialLinks.map((link, i) => {
                            const Icon = iconMap[link.icon];
                            return (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialLink}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    whileHover={{ scale: 1.1, y: -4 }}
                                    aria-label={link.name}
                                >
                                    {Icon && <Icon size={22} />}
                                </motion.a>
                            );
                        })}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
