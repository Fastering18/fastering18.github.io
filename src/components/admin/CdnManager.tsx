"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import {
  Copy,
  Check,
  Trash2,
  Pencil,
  Upload,
  RefreshCw,
  ExternalLink,
  Image as ImageIcon,
  FileIcon,
} from "lucide-react";
import styles from "./CdnManager.module.css";
import type { DriveFileMeta } from "@/lib/drive/cdn";

type Props = {
  initialFiles: DriveFileMeta[];
  siteUrl: string;
  ready: boolean;
  listError?: string | null;
};

function formatBytes(size?: string) {
  const n = size ? Number(size) : NaN;
  if (!n || Number.isNaN(n)) return "n/a";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

function isImage(mime: string, name: string) {
  if (mime.startsWith("image/")) return true;
  return /\.(png|jpe?g|gif|webp|avif|svg|ico)$/i.test(name);
}

export default function CdnManager({
  initialFiles,
  siteUrl,
  ready,
  listError,
}: Props) {
  const [files, setFiles] = useState(initialFiles);
  const [error, setError] = useState<string | null>(listError || null);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [customName, setCustomName] = useState("");
  const [useRandom, setUseRandom] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const base = siteUrl.replace(/\/$/, "");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return files;
    return files.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.mimeType.toLowerCase().includes(q)
    );
  }, [files, query]);

  const refresh = useCallback(() => {
    startTransition(async () => {
      setError(null);
      setMessage(null);
      try {
        const res = await fetch("/api/admin/cdn", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || data.error || "Refresh failed");
        setFiles(data.files || []);
        setMessage(`Loaded ${data.files?.length ?? 0} file(s)`);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Refresh failed");
      }
    });
  }, []);

  const shortUrl = (name: string) => `${base}/${name}`;

  const copyUrl = async (file: DriveFileMeta) => {
    const url = shortUrl(file.name);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(file.id);
      setMessage(`Copied ${url}`);
      setTimeout(() => setCopiedId((id) => (id === file.id ? null : id)), 1800);
    } catch {
      // fallback
      window.prompt("Copy URL:", url);
    }
  };

  const onUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Choose a file to upload");
      return;
    }
    setUploading(true);
    setError(null);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.set("file", selectedFile);
      if (customName.trim()) fd.set("name", customName.trim());
      if (useRandom) fd.set("random", "1");

      const res = await fetch("/api/admin/cdn", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Upload failed");

      setFiles((prev) => [data.file, ...prev.filter((f) => f.id !== data.file.id)]);
      setSelectedFile(null);
      setCustomName("");
      setMessage(`Uploaded ${data.file.name}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const startRename = (file: DriveFileMeta) => {
    setRenamingId(file.id);
    setRenameValue(file.name);
  };

  const saveRename = async (id: string) => {
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/cdn/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: renameValue.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Rename failed");
      setFiles((prev) => prev.map((f) => (f.id === id ? data.file : f)));
      setRenamingId(null);
      setMessage(`Renamed to ${data.file.name}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Rename failed");
    }
  };

  const onDelete = async (file: DriveFileMeta) => {
    if (
      !window.confirm(
        `Move "${file.name}" to Drive trash?\nPublic URL /${file.name} will stop working.`
      )
    ) {
      return;
    }
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/cdn/${encodeURIComponent(file.id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Delete failed");
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
      setMessage(`Deleted ${file.name}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  if (!ready) {
    return (
      <p className={styles.hint}>
        CDN is not ready yet. Fix connection status above, then refresh.
      </p>
    );
  }

  return (
    <div className={styles.wrap}>
      <form className={styles.upload} onSubmit={onUpload}>
        <div className={styles.uploadRow}>
          <label className={styles.fileBtn}>
            <Upload size={16} />
            <span>{selectedFile ? selectedFile.name : "Choose file"}</span>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              hidden
            />
          </label>
          <input
            className={styles.input}
            type="text"
            placeholder="Optional public name (e.g. hero.webp)"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            disabled={useRandom}
          />
          <label className={styles.check}>
            <input
              type="checkbox"
              checked={useRandom}
              onChange={(e) => setUseRandom(e.target.checked)}
            />
            Random short id
          </label>
          <button
            type="submit"
            className={styles.primary}
            disabled={uploading || !selectedFile}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          <button
            type="button"
            className={styles.secondary}
            onClick={refresh}
            disabled={busy}
            title="Refresh list"
          >
            <RefreshCw size={16} className={busy ? styles.spin : undefined} />
          </button>
        </div>
        <p className={styles.hint}>
          Public URL becomes <code>{base}/filename.ext</code>. Share the Drive
          folder with the service account as Content manager so upload works.
        </p>
      </form>

      <div className={styles.toolbar}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search files..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className={styles.count}>
          {filtered.length} / {files.length} files
        </span>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.success}>{message}</p>}

      {filtered.length === 0 ? (
        <p className={styles.hint}>No files yet. Upload one above.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((file) => {
                const url = shortUrl(file.name);
                const img = isImage(file.mimeType, file.name);
                return (
                  <tr key={file.id}>
                    <td className={styles.previewCell}>
                      {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={url}
                          alt=""
                          className={styles.thumb}
                          loading="lazy"
                        />
                      ) : (
                        <span className={styles.fileIcon}>
                          {img ? <ImageIcon size={16} /> : <FileIcon size={16} />}
                        </span>
                      )}
                    </td>
                    <td>
                      {renamingId === file.id ? (
                        <div className={styles.renameRow}>
                          <input
                            className={styles.input}
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                void saveRename(file.id);
                              }
                              if (e.key === "Escape") setRenamingId(null);
                            }}
                          />
                          <button
                            type="button"
                            className={styles.primary}
                            onClick={() => void saveRename(file.id)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className={styles.secondary}
                            onClick={() => setRenamingId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className={styles.nameCell}>
                          <span className={styles.mono}>{file.name}</span>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.quietLink}
                          >
                            /{file.name} <ExternalLink size={12} />
                          </a>
                        </div>
                      )}
                    </td>
                    <td className={styles.muted}>{file.mimeType}</td>
                    <td>{formatBytes(file.size)}</td>
                    <td className={styles.muted}>
                      {file.modifiedTime
                        ? new Date(file.modifiedTime).toLocaleString()
                        : "n/a"}
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.actionBtn}
                          title="Copy public URL"
                          onClick={() => void copyUrl(file)}
                        >
                          {copiedId === file.id ? (
                            <Check size={15} />
                          ) : (
                            <Copy size={15} />
                          )}
                          <span>Copy URL</span>
                        </button>
                        <button
                          type="button"
                          className={styles.actionBtn}
                          title="Rename"
                          onClick={() => startRename(file)}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          className={`${styles.actionBtn} ${styles.danger}`}
                          title="Delete"
                          onClick={() => void onDelete(file)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
