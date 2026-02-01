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
  title: {
    default: "Muhammad Brahmana Priambudi | Full Stack Developer & Game Dev",
    template: "%s | Muhammad Brahmana Priambudi",
  },
  description: "Senior Full Stack Developer specializing in high-performance web applications, game mechanics, and visually stunning digital experiences. Expert in Next.js, TypeScript, and Roblox Studio.",
  keywords: [
    "Muhammad Brahmana Priambudi",
    "Fastering18",
    "Full Stack Developer Indonesia",
    "Game Developer Roblox",
    "Next.js Expert",
    "TypeScript Portfolio",
    "UI/UX Visual Design",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Muhammad Brahmana Priambudi", url: "https://fastering18.github.io" }],
  creator: "Muhammad Brahmana Priambudi",
  publisher: "Muhammad Brahmana Priambudi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Muhammad Brahmana Priambudi | Full Stack Developer & Game Dev",
    description: "Building the next generation of digital experiences through clean code and immersive design.",
    url: "https://fastering18.github.io",
    siteName: "Muhammad Brahmana Priambudi Portfolio",
    images: [
      {
        url: "/images/og-image.png", // We'll need to generate/place this
        width: 1200,
        height: 630,
        alt: "Muhammad Brahmana Priambudi Portfolio Preview",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Brahmana Priambudi | @FasteringDev",
    description: "Full Stack Developer specializing in modern web and game technologies.",
    creator: "@FasteringDev",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#050505",
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
