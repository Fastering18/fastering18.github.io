"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode, forwardRef } from "react";
import styles from "./GlassCard.module.css";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
    hover?: boolean;
    glow?: boolean;
    className?: string;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, hover = true, glow = false, className = "", ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={`${styles.card} ${hover ? styles.hover : ""} ${glow ? styles.glow : ""} ${className}`}
                whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
