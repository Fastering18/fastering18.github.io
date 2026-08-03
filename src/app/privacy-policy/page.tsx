import Link from "next/link";
import type { Metadata } from "next";
import {
  SITE_EMAIL,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Fastering18",
  description:
    "Privacy Policy for the Fastering18 portfolio website operated by Muhammad Brahmana Priambudi. How we collect, use, and protect visitor data.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Fastering18",
    description:
      "Privacy Policy for the Fastering18 portfolio and related services by Muhammad Brahmana Priambudi.",
    url: absoluteUrl("/privacy-policy"),
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const UPDATED = "August 3, 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page} id="main-content">
      <div className={styles.container}>
        <Link href="/" className={styles.back}>
          Back to home
        </Link>

        <header className={styles.header}>
          <span className={styles.eyebrow}>Fastering18 Legal</span>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.updated}>Last updated: {UPDATED}</p>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Who we are</h2>
            <p>
              This Privacy Policy applies to the Fastering18 portfolio website at{" "}
              <a href={SITE_URL}>{SITE_URL}</a> and related pages under that
              domain (the &quot;Site&quot;). The Site is operated by{" "}
              <strong>{SITE_NAME}</strong> (&quot;Fastering18&quot;,
              &quot;FasteringDev&quot;, &quot;we&quot;, &quot;us&quot;, or
              &quot;I&quot;).
            </p>
            <p>
              Contact for privacy questions:{" "}
              <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Scope</h2>
            <p>
              This policy describes how information is collected and used when
              you visit the Site, contact us, use the public portfolio content,
              or when Google services (including Search Console, Analytics, and
              related Google products used for ownership verification and
              performance measurement) process data about the Site.
            </p>
            <p>
              The Site is a personal developer portfolio. It is not a consumer
              social network and does not require an account for browsing
              public pages.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Information we collect</h2>
            <p>We may collect the following categories of information:</p>
            <ul>
              <li>
                <strong>Technical and usage data:</strong> pages viewed, date
                and time of visits, approximate location (country, region, or
                city when available from hosting or edge headers), browser
                type, operating system, device type, language, screen size,
                referrer URL, and similar diagnostics.
              </li>
              <li>
                <strong>Identifiers:</strong> a randomly generated visitor or
                session identifier stored in your browser (for example
                localStorage or sessionStorage) to estimate unique traffic.
                These values are not your real name.
              </li>
              <li>
                <strong>Communications:</strong> if you email us or message us
                on linked social platforms, we receive whatever you choose to
                send (name, email address, message content).
              </li>
              <li>
                <strong>Server and security logs:</strong> standard request
                logs that hosting providers may keep for reliability, abuse
                prevention, and debugging.
              </li>
            </ul>
            <p>
              We do not intentionally collect special category data (for
              example health, political opinions, or biometric identifiers)
              through the public Site.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. How we collect information</h2>
            <ul>
              <li>
                Automatically when you load public pages, through our visitor
                analytics endpoint and hosting infrastructure.
              </li>
              <li>
                Through third party measurement tools that we enable, such as
                Vercel Analytics and, when configured, Google Analytics or
                Google Search Console performance data.
              </li>
              <li>
                Directly from you when you contact us.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>5. Why we use information</h2>
            <p>We use information for:</p>
            <ul>
              <li>Operating, securing, and improving the Site</li>
              <li>
                Understanding traffic patterns (views over time, popular pages,
                countries, devices)
              </li>
              <li>
                Measuring search visibility and fixing crawl or indexing issues
                via Google Search Console
              </li>
              <li>Responding to messages you send</li>
              <li>
                Protecting against spam, abuse, fraud, and technical attacks
              </li>
              <li>Complying with applicable law</li>
            </ul>
            <p>
              Portfolio analytics shown in the private admin area are for the
              site operator only and are not displayed publicly.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Cookies and local storage</h2>
            <p>
              The Site may use browser storage or similar technologies for:
            </p>
            <ul>
              <li>
                Anonymous visitor or session identifiers for traffic analytics
              </li>
              <li>
                Essential site function (for example remembering an admin
                session after login)
              </li>
              <li>
                Optional third party analytics cookies if those tools are
                enabled
              </li>
            </ul>
            <p>
              You can clear cookies and site storage in your browser settings.
              Blocking storage may affect analytics accuracy or admin login.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Google services and branding context</h2>
            <p>
              The Site may use Google products such as Google Search Console
              (ownership verification, indexing, performance reports), Google
              fonts (if loaded via Google infrastructure), and Google Analytics
              or related tags if enabled later. When those services process
              data, Google&apos;s own policies also apply, including the{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Terms of Service
              </a>
              .
            </p>
            <p>
              Fastering18 branding on this Site (including the names
              Fastering18, FasteringDev, and {SITE_NAME}) identifies the
              independent developer portfolio. Use of Google Search Console or
              other Google tools does not mean Google endorses or operates this
              Site. Google trademarks remain the property of Google LLC.
            </p>
            <p>
              For Google Cloud / OAuth style brand verification or authorized
              domain checks, this Privacy Policy and our Terms of Service are
              the public legal pages for the Fastering18 web property hosted at{" "}
              {SITE_URL}.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Sharing of information</h2>
            <p>We may share information with:</p>
            <ul>
              <li>
                Hosting and infrastructure providers (for example Vercel,
                database hosts) that process data on our behalf
              </li>
              <li>
                Analytics and search tooling providers (for example Vercel
                Analytics, Google) as described above
              </li>
              <li>
                Professional advisors or authorities when required by law or to
                protect rights and safety
              </li>
            </ul>
            <p>
              We do not sell personal information. We do not rent visitor lists.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. International transfers</h2>
            <p>
              The Site may be hosted and processed in regions outside your
              country (including the United States or other locations used by
              our providers). Where required, we rely on appropriate safeguards
              offered by those providers.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Data retention</h2>
            <p>
              Analytics events and logs are kept only as long as useful for
              traffic analysis, security, and site maintenance, then deleted or
              aggregated. Contact emails are retained as long as needed to
              handle the conversation or legal obligations.
            </p>
          </section>

          <section className={styles.section}>
            <h2>11. Security</h2>
            <p>
              We use reasonable technical and organizational measures (HTTPS,
              access controls on admin tools, rate limiting on analytics
              endpoints). No method of transmission or storage is completely
              secure.
            </p>
          </section>

          <section className={styles.section}>
            <h2>12. Children</h2>
            <p>
              The Site is not directed at children under 13 (or the minimum age
              required in your region). We do not knowingly collect personal
              information from children. If you believe a child provided data,
              contact us and we will delete it when appropriate.
            </p>
          </section>

          <section className={styles.section}>
            <h2>13. Your rights</h2>
            <p>
              Depending on your location, you may have rights to access,
              correct, delete, or restrict certain personal data, or to object
              to processing. To exercise a request related to this Site, email{" "}
              <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> with enough
              detail to locate your data. We may need to verify the request.
            </p>
          </section>

          <section className={styles.section}>
            <h2>14. Third party links</h2>
            <p>
              Project links may point to Roblox, GitHub, Discord, social
              networks, or other external sites. Their privacy practices are
              governed by their own policies.
            </p>
          </section>

          <section className={styles.section}>
            <h2>15. Changes</h2>
            <p>
              We may update this Privacy Policy from time to time. The &quot;Last
              updated&quot; date at the top will change when we do. Continued use
              of the Site after updates means you accept the revised policy,
              where permitted by law.
            </p>
          </section>

          <section className={styles.section}>
            <h2>16. Contact</h2>
            <p>
              Fastering18 / {SITE_NAME}
              <br />
              Website: <a href={SITE_URL}>{SITE_URL}</a>
              <br />
              Email: <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
              <br />
              GitHub:{" "}
              <a
                href="https://github.com/Fastering18"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Fastering18
              </a>
            </p>
          </section>
        </div>

        <p className={styles.footerNote}>
          Related:{" "}
          <Link href="/tos">Terms of Service</Link>. This page is published for
          visitors and for Google Search Console / brand verification reference
          for the Fastering18 web property.
        </p>
      </div>
    </main>
  );
}
