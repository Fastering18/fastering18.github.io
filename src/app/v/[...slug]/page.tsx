import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CDN_BRAND,
  CDN_THEME_COLOR,
  cdnRawUrl,
  findFileInCdnFolder,
  formatBytes,
  getMediaKind,
  normalizeCdnKey,
} from "@/lib/drive/cdn";
import { SITE_URL } from "@/lib/seo";
import styles from "./embed.module.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function keyFromSlug(slug: string[]) {
  return slug
    .map((s) => {
      try {
        return decodeURIComponent(s);
      } catch {
        return s;
      }
    })
    .join("/");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const key = normalizeCdnKey(keyFromSlug(slug));
  const file = await findFileInCdnFolder(key).catch(() => null);

  if (!file) {
    return {
      title: `Not found | ${CDN_BRAND}`,
      robots: { index: false, follow: false },
    };
  }

  const kind = getMediaKind(file.name, file.mimeType);
  const raw = cdnRawUrl(file.name);
  const pageUrl = `${SITE_URL.replace(/\/$/, "")}/${encodeURIComponent(file.name)}`;
  const description = `${kind.toUpperCase()} · ${formatBytes(file.size)} · Hosted on ${CDN_BRAND}`;

  const base: Metadata = {
    title: `${file.name} | ${CDN_BRAND}`,
    description,
    applicationName: CDN_BRAND,
    authors: [{ name: CDN_BRAND, url: SITE_URL }],
    robots: { index: true, follow: true },
    alternates: { canonical: pageUrl },
    openGraph: {
      title: file.name,
      description,
      url: pageUrl,
      siteName: CDN_BRAND,
      locale: "en_US",
      type: kind === "video" ? "video.other" : "website",
    },
    twitter: {
      card: kind === "image" || kind === "video" ? "summary_large_image" : "summary",
      title: file.name,
      description,
    },
    other: {
      "theme-color": CDN_THEME_COLOR,
    },
  };

  if (kind === "image") {
    base.openGraph = {
      ...base.openGraph,
      images: [
        {
          url: raw,
          alt: file.name,
        },
      ],
    };
    base.twitter = {
      ...base.twitter,
      images: [raw],
    };
  } else if (kind === "video") {
    base.openGraph = {
      ...base.openGraph,
      type: "video.other",
      videos: [
        {
          url: raw,
          type: file.mimeType || "video/mp4",
        },
      ],
      images: file.thumbnailLink
        ? [{ url: file.thumbnailLink, alt: file.name }]
        : undefined,
    };
    base.other = {
      "theme-color": CDN_THEME_COLOR,
      "og:video": raw,
      "og:video:secure_url": raw,
      "og:video:type": file.mimeType || "video/mp4",
    };
  } else if (kind === "audio") {
    base.openGraph = {
      ...base.openGraph,
      type: "music.song",
      audio: [{ url: raw }],
    };
  }

  return base;
}

export const viewport: Viewport = {
  themeColor: CDN_THEME_COLOR,
  colorScheme: "dark",
};

export default async function CdnEmbedPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const key = normalizeCdnKey(keyFromSlug(slug));
  const file = await findFileInCdnFolder(key).catch(() => null);
  if (!file) notFound();

  const kind = getMediaKind(file.name, file.mimeType);
  const raw = cdnRawUrl(file.name);
  const sizeLabel = formatBytes(file.size);

  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden />
      <div className={styles.shell}>
        <header className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.brandMark} aria-hidden />
            <div>
              <p className={styles.brandName}>{CDN_BRAND}</p>
              <p className={styles.brandHost}>
                {SITE_URL.replace(/^https?:\/\//, "")}
              </p>
            </div>
          </div>
          <div className={styles.actions}>
            <a className={styles.rawBtn} href={raw} target="_blank" rel="noopener noreferrer">
              Open raw
            </a>
            <a className={styles.dlBtn} href={raw} download={file.name}>
              Download
            </a>
          </div>
        </header>

        <section className={styles.stage} data-kind={kind}>
          {kind === "image" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={raw} alt={file.name} className={styles.media} />
          )}
          {kind === "video" && (
            <video
              className={styles.media}
              src={raw}
              controls
              playsInline
              preload="metadata"
            />
          )}
          {kind === "audio" && (
            <div className={styles.audioWrap}>
              <div className={styles.audioCard}>
                <p className={styles.audioLabel}>Audio</p>
                <p className={styles.audioName}>{file.name}</p>
                <audio className={styles.audio} src={raw} controls preload="metadata" />
              </div>
            </div>
          )}
          {kind === "pdf" && (
            <iframe title={file.name} src={raw} className={styles.frame} />
          )}
          {(kind === "text" || kind === "file") && (
            <div className={styles.fileCard}>
              <p className={styles.fileExt}>
                .{file.name.split(".").pop()?.toUpperCase() || "FILE"}
              </p>
              <h1 className={styles.fileName}>{file.name}</h1>
              <p className={styles.fileMeta}>
                {file.mimeType} · {sizeLabel}
              </p>
              <a className={styles.primaryLink} href={raw}>
                View / download file
              </a>
            </div>
          )}
        </section>

        <footer className={styles.meta}>
          <div>
            <h1 className={styles.title}>{file.name}</h1>
            <p className={styles.sub}>
              {kind} · {sizeLabel}
              {file.modifiedTime
                ? ` · updated ${new Date(file.modifiedTime).toLocaleString()}`
                : ""}
            </p>
          </div>
          <p className={styles.paths}>
            Embed <code>/{file.name}</code>
            <br />
            Raw <code>/r/{file.name}</code>
          </p>
        </footer>

        <p className={styles.footerNote}>
          Powered by{" "}
          <Link href="/" className={styles.footerLink}>
            Fastering18
          </Link>
        </p>
      </div>
    </main>
  );
}
