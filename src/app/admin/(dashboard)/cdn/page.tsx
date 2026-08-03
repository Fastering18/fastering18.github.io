import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import GlassCard from "@/components/GlassCard";
import { getDriveAuthStatus } from "@/lib/drive/auth";
import { listCdnFiles } from "@/lib/drive/cdn";
import { SITE_URL } from "@/lib/seo";
import styles from "./Cdn.module.css";
import { HardDrive, AlertTriangle, CheckCircle2, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCdnPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const status = getDriveAuthStatus();
  let files: Awaited<ReturnType<typeof listCdnFiles>> = [];
  let listError: string | null = null;

  if (status.ready) {
    try {
      files = await listCdnFiles(80);
    } catch (e) {
      listError = e instanceof Error ? e.message : "Failed to list Drive files";
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Drive CDN</h1>
          <p className={styles.subtitle}>
            Google Drive folder as object storage. Public short links:
            <code> /filename.ext</code> or <code> /randid.ext</code>
          </p>
        </div>
      </header>

      <div className={styles.grid}>
        <GlassCard className={styles.card}>
          <h2 className={styles.cardTitle}>
            <HardDrive size={18} /> Connection status
          </h2>
          <ul className={styles.statusList}>
            <li>
              {status.serviceAccount ? (
                <CheckCircle2 size={16} className={styles.ok} />
              ) : (
                <AlertTriangle size={16} className={styles.warn} />
              )}
              <span>
                Service account{" "}
                {status.serviceAccountEmail
                  ? `(${status.serviceAccountEmail})`
                  : "(missing)"}
              </span>
            </li>
            <li>
              {status.folderIdConfigured ? (
                <CheckCircle2 size={16} className={styles.ok} />
              ) : (
                <AlertTriangle size={16} className={styles.warn} />
              )}
              <span>
                Folder ID{" "}
                {status.folderId
                  ? `(…${status.folderId.slice(-8)})`
                  : "(set GOOGLE_DRIVE_FOLDER_ID)"}
              </span>
            </li>
            <li>
              {status.oauthClient ? (
                <CheckCircle2 size={16} className={styles.ok} />
              ) : (
                <AlertTriangle size={16} className={styles.warn} />
              )}
              <span>OAuth client ID/secret (for google-drive-s3 path)</span>
            </li>
            <li>
              {status.oauthRefreshToken ? (
                <CheckCircle2 size={16} className={styles.ok} />
              ) : (
                <AlertTriangle size={16} className={styles.warn} />
              )}
              <span>
                OAuth refresh token{" "}
                {status.oauthRefreshToken ? "present" : "MISSING"}
              </span>
            </li>
          </ul>
          {status.missing.length > 0 && (
            <div className={styles.missing}>
              <strong>Missing for ready CDN:</strong>
              <ul>
                {status.missing.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          )}
        </GlassCard>

        <GlassCard className={styles.card}>
          <h2 className={styles.cardTitle}>How short links work</h2>
          <ol className={styles.steps}>
            <li>Create a Drive folder for public CDN assets.</li>
            <li>
              Share it with the service account as{" "}
              <strong>Viewer</strong> or <strong>Content manager</strong>.
            </li>
            <li>
              Put files named exactly like the short path, e.g.{" "}
              <code>hero.webp</code> or <code>a8f3c1.png</code>.
            </li>
            <li>
              Open{" "}
              <code>
                {SITE_URL}/filename.ext
              </code>
            </li>
          </ol>
          <p className={styles.hint}>
            Also available as{" "}
            <code>
              {SITE_URL}/api/cdn/filename.ext
            </code>
            . Reserved names (favicon, robots, google verify HTML) stay local.
          </p>
        </GlassCard>
      </div>

      <GlassCard className={styles.card}>
        <h2 className={styles.cardTitle}>Files in CDN folder</h2>
        {listError && <p className={styles.error}>{listError}</p>}
        {!status.ready && (
          <p className={styles.hint}>
            Configure credentials and folder ID to list files. See{" "}
            <code>.private/DRIVE-CDN.md</code>.
          </p>
        )}
        {status.ready && !listError && files.length === 0 && (
          <p className={styles.hint}>Folder is empty. Upload a file to Drive.</p>
        )}
        {files.length > 0 && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Short URL</th>
                </tr>
              </thead>
              <tbody>
                {files.map((f) => {
                  const short = `${SITE_URL}/${f.name}`;
                  return (
                    <tr key={f.id}>
                      <td className={styles.mono}>{f.name}</td>
                      <td>{f.mimeType}</td>
                      <td>
                        {f.size
                          ? `${Math.max(1, Math.round(Number(f.size) / 1024))} KB`
                          : "n/a"}
                      </td>
                      <td>
                        <a href={short} target="_blank" rel="noopener noreferrer">
                          /{f.name} <ExternalLink size={12} />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
