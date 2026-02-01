"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import styles from "./MagneticButton.module.css";

interface MagneticButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "ghost";
    className?: string;
    type?: "button" | "submit" | "reset";
}

export default function MagneticButton({
    children,
    href,
    onClick,
    variant = "primary",
    className = "",
    type = "button",
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set((e.clientX - centerX) * 0.15);
        y.set((e.clientY - centerY) * 0.15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const content = (
        <motion.div
            ref={ref}
            className={`${styles.button} ${styles[variant]} ${className}`}
            style={{ x: xSpring, y: ySpring }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} className={styles.link}>
                {content}
            </a>
        );
    }

    return (
        <button type={type} onClick={onClick} className={styles.link}>
            {content}
        </button>
    );
}
