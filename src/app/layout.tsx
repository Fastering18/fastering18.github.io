import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Brahmana Priambudi | Full Stack Developer",
  description: "Full Stack Developer specializing in modern web and game technologies. Building performant, accessible, and visually stunning digital experiences.",
  keywords: ["Full Stack Developer", "Web Developer", "Game Developer", "Roblox", "Next.js", "TypeScript", "Node.js"],
  authors: [{ name: "Muhammad Brahmana Priambudi" }],
  openGraph: {
    title: "Muhammad Brahmana Priambudi | Full Stack Developer",
    description: "Full Stack Developer specializing in modern web and game technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Brahmana Priambudi | Full Stack Developer",
    description: "Full Stack Developer specializing in modern web and game technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <CustomCursor />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
