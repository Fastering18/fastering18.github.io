"use client";

import { Heart } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <span className={styles.logo}>MBP</span>
                    <p className={styles.tagline}>Building digital experiences</p>
                </div>

                <nav className={styles.nav}>
                    <a href="/#home" className={styles.link}>Home</a>
                    <a href="/#about" className={styles.link}>About</a>
                    <a href="/#projects" className={styles.link}>Projects</a>
                    <a href="/#contact" className={styles.link}>Contact</a>
                </nav>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {currentYear} Muhammad Brahmana Priambudi. All rights reserved.
                    </p>
                    <p className={styles.credit}>
                        Made with <Heart size={14} className={styles.heart} /> using Next.js
                    </p>
                </div>
            </div>
        </footer>
    );
}
