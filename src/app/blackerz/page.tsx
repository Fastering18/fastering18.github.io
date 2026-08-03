import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import {
  SITE_EMAIL,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";
import styles from "./blackerz.module.css";

const BLACKERZ_URL = absoluteUrl("/blackerz");
const GITHUB_ORG = "https://github.com/Blackerz-id";

export const metadata: Metadata = {
  title: "Blackerz | Developer platform by Fastering18",
  description:
    "Blackerz is a developer platform and corporate brand owned by Fastering18 (Muhammad Brahmana Priambudi). APIs, SDKs, and open source tools for bots and game integrations.",
  alternates: {
    canonical: "/blackerz",
  },
  keywords: [
    "Blackerz",
    "Blackerz-id",
    "Blackerz API",
    "Fastering18",
    "Muhammad Brahmana Priambudi",
    "Discord bot tools",
    "game developer SDK",
  ],
  openGraph: {
    title: "Blackerz | by Fastering18",
    description:
      "Official Blackerz application homepage. Developer APIs, SDKs, and open source under Blackerz-id, owned by Fastering18.",
    url: BLACKERZ_URL,
    siteName: "Blackerz",
    type: "website",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Blackerz by Fastering18",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Blackerz | by Fastering18",
    description:
      "Developer platform brand owned by Fastering18. GitHub organization Blackerz-id.",
    creator: "@FasteringDev",
  },
  robots: {
    index: true,
    follow: true,
  },
  applicationName: "Blackerz",
};

function blackerzJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BLACKERZ_URL}#organization`,
    name: "Blackerz",
    alternateName: ["Blackerz-id", "Blackerz.id", "Blackerz API"],
    url: BLACKERZ_URL,
    logo: absoluteUrl("/android-chrome-512x512.png"),
    description:
      "Blackerz is a developer platform brand owned by Fastering18 (Muhammad Brahmana Priambudi), providing APIs, SDKs, and open source tooling.",
    email: SITE_EMAIL,
    foundingDate: "2021",
    sameAs: [GITHUB_ORG],
    parentOrganization: {
      "@type": "Person",
      name: SITE_NAME,
      alternateName: ["Fastering18", "FasteringDev"],
      url: SITE_URL,
    },
    founder: {
      "@type": "Person",
      name: SITE_NAME,
      alternateName: "Fastering18",
      url: SITE_URL,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_EMAIL,
      contactType: "customer support",
      url: BLACKERZ_URL,
    },
  };
}

const REPOS = [
  {
    name: "API-Blackerz",
    desc: "Blackerz API written in Python",
    href: `${GITHUB_ORG}/API-Blackerz`,
    lang: "Python",
  },
  {
    name: "Blackerz-SDK-JS",
    desc: "JavaScript API wrapper for Blackerz",
    href: `${GITHUB_ORG}/Blackerz-SDK-JS`,
    lang: "JavaScript",
  },
  {
    name: "Blackerz-SDK-Python",
    desc: "Python developer kit for the Blackerz API",
    href: `${GITHUB_ORG}/Blackerz-SDK-Python`,
    lang: "Python",
  },
  {
    name: "blackerz-lua",
    desc: "Official Blackerz Lua API wrapper",
    href: `${GITHUB_ORG}/blackerz-lua`,
    lang: "Lua",
  },
  {
    name: "discord.js-bot-starter",
    desc: "Starter templates for Discord bots with discord.js",
    href: `${GITHUB_ORG}/discord.js-bot-starter`,
    lang: "JavaScript",
  },
];

export default function BlackerzPage() {
  return (
    <>
      <JsonLd data={blackerzJsonLd()} />
      <main className={styles.page} id="main-content">
        <div className={styles.glow} aria-hidden />
        <div className={styles.container}>
          <header className={styles.hero}>
            <p className={styles.eyebrow}>Corporate brand · Owned by Fastering18</p>
            <h1 className={styles.title}>Blackerz</h1>
            <p className={styles.tagline}>
              Developer platform for APIs, SDKs, and bot tooling. This page is the
              official public homepage for Blackerz applications and OAuth brand
              configuration.
            </p>
            <div className={styles.actions}>
              <a
                className={styles.primaryBtn}
                href={GITHUB_ORG}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub organization
              </a>
              <Link className={styles.secondaryBtn} href="/">
                Fastering18 portfolio
              </Link>
            </div>
          </header>

          <section className={styles.card} aria-labelledby="about-heading">
            <h2 id="about-heading">About Blackerz</h2>
            <p>
              <strong>Blackerz</strong> (also Blackerz-id / Blackerz.id) is a
              client and corporate developer brand owned and operated by{" "}
              <strong>Fastering18</strong> ({SITE_NAME}). It covers API
              services, language SDKs, and open source utilities aimed at Discord
              bots, game integrations, and automation workflows.
            </p>
            <p>
              Application consoles (including Google Cloud / OAuth brand
              verification) should use this URL as the Blackerz application home
              page:{" "}
              <a href={BLACKERZ_URL}>{BLACKERZ_URL}</a>
            </p>
          </section>

          <section className={styles.card} aria-labelledby="ownership-heading">
            <h2 id="ownership-heading">Ownership and operator</h2>
            <ul className={styles.list}>
              <li>
                <span>Brand</span>
                <strong>Blackerz</strong>
              </li>
              <li>
                <span>Owner</span>
                <strong>Fastering18 ({SITE_NAME})</strong>
              </li>
              <li>
                <span>GitHub org</span>
                <a href={GITHUB_ORG} target="_blank" rel="noopener noreferrer">
                  github.com/Blackerz-id
                </a>
              </li>
              <li>
                <span>Portfolio</span>
                <a href={SITE_URL}>{SITE_URL}</a>
              </li>
              <li>
                <span>Contact</span>
                <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
              </li>
            </ul>
          </section>

          <section className={styles.card} aria-labelledby="products-heading">
            <h2 id="products-heading">Open source and products</h2>
            <p className={styles.lead}>
              Public repositories under the Blackerz-id organization:
            </p>
            <div className={styles.repoGrid}>
              {REPOS.map((repo) => (
                <a
                  key={repo.name}
                  className={styles.repoCard}
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.repoTop}>
                    <span className={styles.repoName}>{repo.name}</span>
                    <span className={styles.repoLang}>{repo.lang}</span>
                  </div>
                  <p>{repo.desc}</p>
                </a>
              ))}
            </div>
          </section>

          <section className={styles.card} aria-labelledby="legal-heading">
            <h2 id="legal-heading">Legal and policies</h2>
            <p>
              Blackerz applications and developer tools under this brand follow
              the same operator policies as Fastering18 unless a specific product
              states otherwise.
            </p>
            <ul className={styles.policyLinks}>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/tos">Terms of Service</Link>
              </li>
            </ul>
            <p className={styles.note}>
              Google, Discord, Roblox, and other third party marks belong to their
              owners. Use of those platforms with Blackerz tools does not imply
              partnership unless separately stated.
            </p>
          </section>

          <footer className={styles.footer}>
            <p>
              © {new Date().getFullYear()} Blackerz · Owned by Fastering18 (
              {SITE_NAME})
            </p>
            <p>
              <a href={GITHUB_ORG} target="_blank" rel="noopener noreferrer">
                {GITHUB_ORG}
              </a>
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
