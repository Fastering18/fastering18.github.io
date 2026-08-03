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
  title: "Terms of Service | Fastering18",
  description:
    "Terms of Service for the Fastering18 portfolio website operated by Muhammad Brahmana Priambudi. Rules for using the site and brand.",
  alternates: {
    canonical: "/tos",
  },
  openGraph: {
    title: "Terms of Service | Fastering18",
    description:
      "Terms of Service for Fastering18 portfolio and related web properties by Muhammad Brahmana Priambudi.",
    url: absoluteUrl("/tos"),
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const UPDATED = "August 3, 2026";

export default function TermsOfServicePage() {
  return (
    <main className={styles.page} id="main-content">
      <div className={styles.container}>
        <Link href="/" className={styles.back}>
          Back to home
        </Link>

        <header className={styles.header}>
          <span className={styles.eyebrow}>Fastering18 Legal</span>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.updated}>Last updated: {UPDATED}</p>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Agreement</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern access to and use of
              the Fastering18 portfolio website at{" "}
              <a href={SITE_URL}>{SITE_URL}</a>, including subpages such as
              project case studies, feeds, and legal pages (together, the
              &quot;Site&quot;).
            </p>
            <p>
              The Site is operated by <strong>{SITE_NAME}</strong>, also known
              as Fastering18 and FasteringDev (&quot;we&quot;, &quot;us&quot;,
              &quot;I&quot;). By using the Site, you agree to these Terms and to
              our{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>. If you do not
              agree, do not use the Site.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Who these Terms apply to</h2>
            <p>
              These Terms apply to all visitors, users, crawlers, and any person
              or automated system that accesses the Site. If you use the Site on
              behalf of an organization, you represent that you have authority
              to bind that organization.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Description of the Site</h2>
            <p>
              The Site is a personal and professional portfolio for Fastering18.
              It showcases software and game development work, skills, contact
              paths, and related content. Features may include project pages,
              media galleries, RSS feeds, sitemaps, and a private admin area for
              the operator only.
            </p>
            <p>
              The Site is provided for informational and professional
              presentation purposes. Unless a separate written contract says
              otherwise, nothing on the Site is an offer of employment,
              partnership, or guaranteed service delivery.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Brand identity (Fastering18)</h2>
            <p>
              The following brand identifiers refer to this portfolio and its
              operator unless context clearly indicates otherwise:
            </p>
            <ul>
              <li>Fastering18</li>
              <li>FasteringDev</li>
              <li>Fastering</li>
              <li>{SITE_NAME}</li>
              <li>MBP (site monogram)</li>
            </ul>
            <p>
              You may link to the Site and refer to Fastering18 factually (for
              example citing a public project). You may not:
            </p>
            <ul>
              <li>
                Imply endorsement, employment, or partnership without written
                permission
              </li>
              <li>
                Use Fastering18 logos, names, or site design in a way that
                confuses people about the source of a product or service
              </li>
              <li>
                Register domains, social handles, or app listings that
                impersonate Fastering18
              </li>
              <li>
                Scrape branding assets for commercial reuse without permission
              </li>
            </ul>
            <p>
              Google, Roblox, Discord, GitHub, and other third party names are
              trademarks of their respective owners. Their appearance on the
              Site does not imply affiliation beyond factual project or tool
              references.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Google Search Console and Google branding compliance</h2>
            <p>
              This Site may be verified in Google Search Console and related
              Google developer or Cloud consoles for ownership confirmation,
              search performance monitoring, and authorized domain / brand
              configuration.
            </p>
            <p>
              Public legal pages for that verification context include:
            </p>
            <ul>
              <li>
                Privacy Policy:{" "}
                <a href={absoluteUrl("/privacy-policy")}>
                  {absoluteUrl("/privacy-policy")}
                </a>
              </li>
              <li>
                Terms of Service:{" "}
                <a href={absoluteUrl("/tos")}>{absoluteUrl("/tos")}</a>
              </li>
              <li>
                Homepage: <a href={SITE_URL}>{SITE_URL}</a>
              </li>
            </ul>
            <p>
              Application names or OAuth brand labels that reference Fastering18
              or {SITE_NAME} are intended to identify this operator&apos;s
              properties. They must not misrepresent Google services as owned by
              Fastering18, or Fastering18 services as owned by Google.
            </p>
            <p>
              Use of Google services remains subject to applicable Google terms
              and policies, including the{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Privacy Policy
              </a>
              .
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>
                Attack, overload, or disrupt the Site (including DDoS, malware
                distribution, or credential stuffing)
              </li>
              <li>
                Bypass rate limits, authentication, or access controls on admin
                or API routes
              </li>
              <li>
                Scrape the Site in a way that harms availability or violates
                robots rules for private paths
              </li>
              <li>
                Upload or transmit unlawful, harmful, or infringing content
                through any contact channel tied to the Site
              </li>
              <li>
                Use the Site to violate any applicable law or third party rights
              </li>
              <li>
                Misrepresent your identity when contacting us for commercial or
                security sensitive purposes
              </li>
            </ul>
            <p>
              We may block IP addresses, rate limit requests, or take other
              protective steps at our discretion.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Intellectual property</h2>
            <p>
              Unless otherwise noted, the Site&apos;s original text, layout,
              code presentation, and portfolio descriptions are owned by{" "}
              {SITE_NAME} / Fastering18. Project media may include game screenshots,
              third party assets used under applicable licenses, or collaborator
              work credited on the project page.
            </p>
            <p>
              You may view and share links to public pages. You may not copy
              substantial Site content for commercial republication without
              permission, except for fair use, search indexing, or brief
              quotation with attribution.
            </p>
            <p>
              Open source repositories linked from the Site remain under their
              own licenses (for example MIT or as stated on GitHub).
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Third party services and projects</h2>
            <p>
              The Site links to external platforms (Roblox experiences, GitHub
              repositories, Discord, social media, dashboards). Those services
              have their own terms. We are not responsible for third party
              content, uptime, moderation, or account actions on those
              platforms.
            </p>
            <p>
              Game statistics (visits, concurrent players, and similar metrics)
              are approximate and may change after publication.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. No professional warranties</h2>
            <p>
              Portfolio case studies describe past or current work. They are not
              guarantees of future results. Code samples, architecture notes,
              and performance claims are provided &quot;as is&quot; for demonstration.
            </p>
            <p>
              To the fullest extent permitted by law, the Site is provided
              without warranties of any kind, whether express or implied,
              including merchantability, fitness for a particular purpose, and
              non infringement.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, {SITE_NAME} / Fastering18
              will not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits, data,
              or goodwill, arising from your use of the Site or inability to use
              it.
            </p>
            <p>
              Our total liability for any claim arising out of these Terms or
              the Site will not exceed the greater of (a) the amount you paid us
              specifically for access to the Site in the twelve months before
              the claim (usually zero for free portfolio access) or (b) USD 50.
            </p>
          </section>

          <section className={styles.section}>
            <h2>11. Indemnity</h2>
            <p>
              You agree to defend and indemnify {SITE_NAME} / Fastering18 against
              claims, damages, losses, and expenses (including reasonable legal
              fees) arising from your misuse of the Site, your violation of these
              Terms, or your infringement of any right of another person.
            </p>
          </section>

          <section className={styles.section}>
            <h2>12. Admin and private areas</h2>
            <p>
              Routes under <code>/admin</code> and certain APIs are private.
              Unauthorized access attempts are prohibited. If you receive admin
              credentials by mistake, notify us and do not use them.
            </p>
          </section>

          <section className={styles.section}>
            <h2>13. Privacy</h2>
            <p>
              Our collection and use of information is described in the{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>, which is
              incorporated by reference into these Terms.
            </p>
          </section>

          <section className={styles.section}>
            <h2>14. Changes to the Site or Terms</h2>
            <p>
              We may update content, features, or these Terms at any time. The
              &quot;Last updated&quot; date will change when Terms are revised.
              Material changes may be highlighted on this page. Continued use
              after changes constitutes acceptance where allowed by law.
            </p>
          </section>

          <section className={styles.section}>
            <h2>15. Termination</h2>
            <p>
              We may suspend or terminate access to the Site for any visitor who
              violates these Terms or harms the Site. Provisions that by nature
              should survive (including intellectual property, disclaimers, and
              limitations of liability) will survive termination.
            </p>
          </section>

          <section className={styles.section}>
            <h2>16. Governing law</h2>
            <p>
              These Terms are governed by the laws of the Republic of Indonesia,
              without regard to conflict of law rules, unless mandatory local
              consumer law in your country requires otherwise. Courts in
              Indonesia will have jurisdiction for disputes arising from these
              Terms, subject to any non waivable rights you may have.
            </p>
          </section>

          <section className={styles.section}>
            <h2>17. Contact</h2>
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
              <br />
              X:{" "}
              <a
                href="https://x.com/FasteringDev"
                target="_blank"
                rel="noopener noreferrer"
              >
                @FasteringDev
              </a>
            </p>
          </section>
        </div>

        <p className={styles.footerNote}>
          Related: <Link href="/privacy-policy">Privacy Policy</Link>. These
          Terms define use of the Fastering18 portfolio for visitors and for
          Google Search Console / brand verification reference.
        </p>
      </div>
    </main>
  );
}
