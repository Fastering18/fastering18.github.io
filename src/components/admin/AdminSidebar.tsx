"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, Code, FileText, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import styles from "./AdminSidebar.module.css";

const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Projects", icon: Briefcase, href: "/admin/projects" },
    { name: "Skills", icon: Code, href: "/admin/skills" },
    { name: "Blogs", icon: FileText, href: "/admin/blogs" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <Link href="/">MBP ADMIN</Link>
            </div>
            <nav className={styles.nav}>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className={styles.footer}>
                <button onClick={() => signOut()} className={styles.logoutBtn}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
