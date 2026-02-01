"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Plane } from "lucide-react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250 };
    const sx = useSpring(cursorX, springConfig);
    const sy = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            const target = e.target as HTMLElement;
            setIsHovering(!!target.closest("button, a, .interactive"));
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    return (
        <>
            <motion.div
                className={styles.cursor}
                style={{
                    x: sx,
                    y: sy,
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <motion.div
                    animate={{
                        rotate: isHovering ? 45 : 0,
                        scale: isHovering ? 1.5 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={styles.planeWrapper}
                >
                    <Plane size={24} className={styles.planeIcon} />
                </motion.div>
            </motion.div>
            <motion.div
                className={styles.glow}
                style={{
                    x: sx,
                    y: sy,
                    opacity: isVisible ? 0.2 : 0,
                }}
            />
        </>
    );
}
