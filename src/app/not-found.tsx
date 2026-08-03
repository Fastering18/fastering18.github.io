import Link from "next/link";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        padding: "120px 24px 80px",
        textAlign: "center",
      }}
    >
      <div>
        <p style={{ color: "#8b5cf6", fontWeight: 600, marginBottom: 12 }}>404</p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: 12 }}>
          Page not found
        </h1>
        <p style={{ color: "#a0a0a0", marginBottom: 28, maxWidth: 420 }}>
          That URL is not part of {SITE_NAME}&apos;s portfolio. Head back to the homepage.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            padding: "12px 22px",
            borderRadius: 12,
            background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
