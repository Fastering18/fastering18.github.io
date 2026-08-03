import { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
  metadataBase: new URL("https://fastering.is-cool.dev"),
  title: {
    default: "Muhammad Brahmana Priambudi | Full Stack Developer & Game Dev",
    template: "%s | Muhammad Brahmana Priambudi",
  },
  description: "Senior Full Stack Developer specializing in high-performance web applications, game mechanics, and visually stunning digital experiences. Expert in Next.js, TypeScript, and Roblox Studio.",
  alternates: {
    canonical: "https://fastering.is-cool.dev",
  },
  verification: {
    google: "CkbFuBULQLzPPzVDQCdHM4H62G5u9RP1gBh2ZxUADlQ",
  },
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
  authors: [{ name: "Muhammad Brahmana Priambudi", url: "https://fastering.is-cool.dev" }],
  creator: "Muhammad Brahmana Priambudi",
  publisher: "Muhammad Brahmana Priambudi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Muhammad Brahmana Priambudi | Dev",
    description: "Building the next generation of digital experiences through clean code and immersive design.",
    url: "https://fastering.is-cool.dev",
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
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon-16x16.png?v=2",
    apple: "/apple-touch-icon.png?v=2",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Muhammad Brahmana Priambudi",
              "url": "https://fastering.is-cool.dev",
              "jobTitle": "Full Stack Developer & Roblox Systems Developer",
              "sameAs": [
                "https://github.com/Fastering18",
                "https://id.linkedin.com/in/muhammad-brahmana-priambudi-888042320",
                "https://discord.com/users/775363892167573535",
                "https://x.com/FasteringDev"
              ],
              "description": "Full stack and Roblox systems developer shipping live game economies, Knit services, and modern Next.js apps."
            })
          }}
        />
      </head>
      <body>
        <CustomCursor />
        <PageTransition>
          {children}
        </PageTransition>
        <Analytics />
      </body>
    </html>
  );
}
