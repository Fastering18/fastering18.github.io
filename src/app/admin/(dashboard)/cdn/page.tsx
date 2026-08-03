import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import GlassCard from "@/components/GlassCard";
import CdnManager from "@/components/admin/CdnManager";
import { getDriveAuthStatus } from "@/lib/drive/auth";
import { listCdnFiles } from "@/lib/drive/cdn";
import { SITE_URL } from "@/lib/seo";
import styles from "./Cdn.module.css";
import { HardDrive, AlertTriangle, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCdnPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const status = getDriveAuthStatus();
  let files: Awaited<ReturnType<typeof listCdnFiles>> = [];
  let listError: string | null = null;

  if (status.ready) {
    try {
      files = await listCdnFiles(300);
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
            Manage Google Drive assets and public short links
            <code> /filename.ext</code>
          </p>
        </div>
      </header>

      <div className={styles.grid}>
        <GlassCard className={styles.card}>
          <h2 className={styles.cardTitle}>
            <HardDrive size={18} /> Connection
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
              {status.ready ? (
                <CheckCircle2 size={16} className={styles.ok} />
              ) : (
                <AlertTriangle size={16} className={styles.warn} />
              )}
              <span>{status.ready ? "CDN ready" : "CDN not ready"}</span>
            </li>
          </ul>
          {status.missing.length > 0 && (
            <div className={styles.missing}>
              <strong>Missing:</strong>
              <ul>
                {status.missing.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          )}
          {status.notes?.length ? (
            <ul className={styles.notes}>
              {status.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          ) : null}
        </GlassCard>

        <GlassCard className={styles.card}>
          <h2 className={styles.cardTitle}>Short links</h2>
          <ol className={styles.steps}>
            <li>Upload below (or put files in the shared Drive folder).</li>
            <li>
              Public URL is <code>{SITE_URL}/filename.ext</code>
            </li>
            <li>Use Copy URL on any row.</li>
            <li>Rename updates the public path; delete moves file to trash.</li>
          </ol>
        </GlassCard>
      </div>

      <GlassCard className={styles.card}>
        <h2 className={styles.cardTitle}>Files</h2>
        <CdnManager
          initialFiles={files}
          siteUrl={SITE_URL}
          ready={status.ready}
          listError={listError}
        />
      </GlassCard>
    </div>
  );
}
