"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import styles from "./SkillBadge.module.css";

interface SkillBadgeProps {
    name: string;
    icon?: LucideIcon;
    iconUrl?: string;
    index?: number;
}

export default function SkillBadge({ name, icon: Icon, iconUrl, index = 0 }: SkillBadgeProps) {
    return (
        <motion.div
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
        >
            {Icon && <Icon size={18} className={styles.icon} />}
            {iconUrl && (
                <img src={iconUrl} alt={name} className={styles.iconImg} loading="lazy" />
            )}
            <span className={styles.name}>{name}</span>
        </motion.div>
    );
}
