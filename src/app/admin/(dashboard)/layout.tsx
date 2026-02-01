import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import styles from "./admin.module.css";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // The layout is now inside (dashboard), so we can safely redirect to login if no session
    if (!session) {
        redirect("/admin/login");
    }

    return (
        <div className={styles.layout}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <div className={styles.container}>
                    {children}
                </div>
            </main>
        </div>
    );
}
