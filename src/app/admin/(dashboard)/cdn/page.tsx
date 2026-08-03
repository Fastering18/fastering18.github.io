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
      ? { type: "ok" as const, text: "Google Drive connected. Uploads will use your account storage." }
      : params.oauth === "disconnected"
        ? { type: "ok" as const, text: "Google Drive OAuth disconnected." }
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
            Manage Google Drive assets and public short links
            <code> /filename.ext</code>
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

      <div className={styles.grid}>
        <GlassCard className={styles.card}>
          <h2 className={styles.cardTitle}>
            <HardDrive size={18} /> Connection
          </h2>
          <ul className={styles.statusList}>
            <li>
              {status.oauthRefreshToken ? (
                <CheckCircle2 size={16} className={styles.ok} />
              ) : (
                <AlertTriangle size={16} className={styles.warn} />
              )}
              <span>
                Google account (upload quota){" "}
                {status.oauthEmail
                  ? `(${status.oauthEmail})`
                  : status.oauthRefreshToken
                    ? "(connected)"
                    : "(not connected)"}
              </span>
            </li>
            <li>
              {status.oauthClient ? (
                <CheckCircle2 size={16} className={styles.ok} />
              ) : (
                <AlertTriangle size={16} className={styles.warn} />
              )}
              <span>OAuth client ID/secret</span>
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
                  : "(missing)"}
              </span>
            </li>
            <li>
              {status.serviceAccount ? (
                <CheckCircle2 size={16} className={styles.ok} />
              ) : (
                <AlertTriangle size={16} className={styles.warn} />
              )}
              <span>
                Service account{" "}
                {status.serviceAccountEmail
                  ? `(read fallback: ${status.serviceAccountEmail})`
                  : "(optional)"}
              </span>
            </li>
            <li>
              {status.canWrite ? (
                <CheckCircle2 size={16} className={styles.ok} />
              ) : (
                <AlertTriangle size={16} className={styles.warn} />
              )}
              <span>
                {status.canWrite
                  ? "Upload/edit/delete ready"
                  : "Upload blocked until Google account is connected"}
              </span>
            </li>
          </ul>

          <div className={styles.oauthActions}>
            {status.oauthClient && !status.oauthRefreshToken && (
              <a href="/api/admin/cdn/oauth/start" className={styles.connectBtn}>
                <Link2 size={16} />
                Connect Google Drive
              </a>
            )}
            {status.oauthRefreshToken && (
              <form action="/api/admin/cdn/oauth/disconnect" method="POST">
                <button type="submit" className={styles.disconnectBtn}>
                  <Unplug size={16} />
                  Disconnect Google
                </button>
              </form>
            )}
          </div>

          {status.missing.length > 0 && (
            <div className={styles.missing}>
              <strong>Action needed:</strong>
              <ul>
                {status.missing.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.explain}>
            <strong>Why the 403 happened</strong>
            <p>
              Google service accounts have <em>no</em> My Drive storage quota.
              Your 5TB lives on <code>blackerzdiscord@gmail.com</code>, not on
              the robot account. Uploads must run as your Google user via OAuth.
            </p>
          </div>

          {status.notes?.length ? (
            <ul className={styles.notes}>
              {status.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          ) : null}
        </GlassCard>

        <GlassCard className={styles.card}>
          <h2 className={styles.cardTitle}>Setup checklist</h2>
          <ol className={styles.steps}>
            <li>
              In Google Cloud OAuth client, add redirect URI:
              <br />
              <code>
                {SITE_URL}/api/admin/cdn/oauth/callback
              </code>
              <br />
              and local:
              <br />
              <code>http://localhost:3000/api/admin/cdn/oauth/callback</code>
            </li>
            <li>
              Click <strong>Connect Google Drive</strong> and sign in as the
              account that owns the folder (and the 5TB quota).
            </li>
            <li>
              Folder ID env must point to a folder in that same account.
            </li>
            <li>Upload files below; use Copy URL for short links.</li>
          </ol>
        </GlassCard>
      </div>

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
