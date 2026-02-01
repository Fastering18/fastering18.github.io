"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Plane } from "lucide-react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const targetRotate = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 250 };
    const rotationConfig = { damping: 20, stiffness: 100 };

    const sx = useSpring(cursorX, springConfig);
    const sy = useSpring(cursorY, springConfig);
    const sRotate = useSpring(targetRotate, rotationConfig);

    const prevPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;

            cursorX.set(x);
            cursorY.set(y);

            // Calculate angle for directional flight
            const dx = x - prevPos.current.x;
            const dy = y - prevPos.current.y;

            // Only update rotation if movement is significant enough to determine direction
            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
                // atan2 gives angle in radians, convert to degrees
                // We add 0 offset because the Plane icon points top-right (usually 45deg) 
                // but let's assume it points right (0deg) for calculation.
                // Lucide Plane icon points top-right by default, so we might need an offset.
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                targetRotate.set(angle + 45); // +45 to align the icon's natural tilt
            }

            prevPos.current = { x, y };

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
    }, [cursorX, cursorY, isVisible, targetRotate]);

    return (
        <>
            <motion.div
                className={styles.cursor}
                style={{
                    x: sx,
                    y: sy,
                    opacity: isVisible ? 1 : 0,
                    zIndex: 9999,
                    pointerEvents: "none",
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 1.5 : 1,
                    }}
                    style={{
                        rotate: sRotate,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={styles.planeWrapper}
                >
                    <Plane
                        size={24}
                        className={styles.planeIcon}
                        fill={isHovering ? "var(--accent-purple)" : "none"}
                    />
                </motion.div>
            </motion.div>
            <motion.div
                className={styles.glow}
                style={{
                    x: sx,
                    y: sy,
                    opacity: isVisible ? 0.2 : 0,
                    zIndex: 9998,
                    pointerEvents: "none",
                }}
            />
        </>
    );
}
