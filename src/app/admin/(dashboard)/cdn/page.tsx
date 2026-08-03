import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import GlassCard from "@/components/GlassCard";
import CdnManager from "@/components/admin/CdnManager";
import { getDriveAuthStatus } from "@/lib/drive/auth";
import { listCdnFiles } from "@/lib/drive/cdn";
import { SITE_URL } from "@/lib/seo";
import styles from "./Cdn.module.css";
import {
  HardDrive,
  AlertTriangle,
  CheckCircle2,
  Link2,
  Unplug,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCdnPage({
  searchParams,
}: {
  searchParams: Promise<{ oauth?: string; reason?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const params = await searchParams;
  const status = await getDriveAuthStatus();
  let files: Awaited<ReturnType<typeof listCdnFiles>> = [];
  let listError: string | null = null;

  if (status.ready) {
    try {
      files = await listCdnFiles(300);
    } catch (e) {
      listError = e instanceof Error ? e.message : "Failed to list Drive files";
    }
  }

  const oauthBanner =
    params.oauth === "connected"
      ? {
          type: "ok" as const,
          text: "Google Drive connected.",
        }
      : params.oauth === "disconnected"
        ? { type: "ok" as const, text: "Google Drive disconnected." }
        : params.oauth === "error"
          ? {
              type: "err" as const,
              text: `OAuth failed: ${params.reason || "unknown error"}`,
            }
          : null;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Drive CDN</h1>
          <p className={styles.subtitle}>
            Embed <code>/{`{file}`}</code> · Raw <code>/r/{`{file}`}</code>
          </p>
        </div>
      </header>

      {oauthBanner && (
        <div
          className={
            oauthBanner.type === "ok" ? styles.bannerOk : styles.bannerErr
          }
        >
          {oauthBanner.text}
        </div>
      )}

      <GlassCard className={styles.card}>
        <div className={styles.statusBar}>
          <div className={styles.statusLeft}>
            <HardDrive size={18} />
            <div>
              <p className={styles.statusTitle}>
                {status.canWrite
                  ? "Ready"
                  : status.ready
                    ? "Read only"
                    : "Not connected"}
              </p>
              <p className={styles.statusMeta}>
                {status.oauthEmail ||
                  (status.oauthRefreshToken
                    ? "Google connected"
                    : "Connect Google to upload")}
                {status.folderId ? " · folder configured" : " · set folder ID"}
              </p>
            </div>
          </div>
          <div className={styles.oauthActions}>
            {status.oauthClient && (
              <a href="/api/admin/cdn/oauth/start" className={styles.connectBtn}>
                <Link2 size={16} />
                {status.oauthRefreshToken ? "Reconnect" : "Connect Google"}
              </a>
            )}
            {status.oauthRefreshToken && (
              <form action="/api/admin/cdn/oauth/disconnect" method="POST">
                <button type="submit" className={styles.disconnectBtn}>
                  <Unplug size={16} />
                  Disconnect
                </button>
              </form>
            )}
          </div>
        </div>

        {(!status.canWrite || !status.ready) && (
          <div className={styles.missing}>
            {!status.oauthRefreshToken && (
              <p>
                Connect Google Drive with the account that owns the CDN folder
                to enable upload, rename, and delete.
              </p>
            )}
            {!status.folderIdConfigured && (
              <p>
                Set <code>GOOGLE_DRIVE_FOLDER_ID</code> in environment variables.
              </p>
            )}
            {status.canWrite && !status.ready && status.missing.length > 0 && (
              <ul>
                {status.missing.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </GlassCard>

      <GlassCard className={styles.card}>
        <h2 className={styles.cardTitle}>Files</h2>
        <CdnManager
          initialFiles={files}
          siteUrl={SITE_URL}
          ready={status.ready}
          canWrite={status.canWrite}
          listError={listError}
        />
      </GlassCard>
    </div>
  );
}
