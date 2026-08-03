import { getAccessToken } from "./auth";
import { SITE_URL } from "@/lib/seo";

/** Allow spaces and common safe filename characters */
const NAME_RE =
  /^[A-Za-z0-9][A-Za-z0-9 ._\-()]{0,200}\.[A-Za-z0-9]{1,16}$/;

const DRIVE_API = "https://www.googleapis.com/drive/v3";
const DRIVE_UPLOAD = "https://www.googleapis.com/upload/drive/v3";

export const CDN_BRAND = "Fastering CDN";
export const CDN_THEME_COLOR = "#8b5cf6";

export function normalizeCdnKey(key: string) {
  try {
    return decodeURIComponent(key).trim();
  } catch {
    return key.trim();
  }
}

export function isValidCdnKey(key: string) {
  const k = normalizeCdnKey(key);
  if (!k || k.includes("/") || k.includes("..") || k.includes("\\")) return false;
  return NAME_RE.test(k);
}

/** Keep spaces; strip only unsafe path characters */
export function sanitizeCdnFileName(name: string): string | null {
  const base = name.split(/[/\\]/).pop()?.trim() || "";
  const cleaned = base
    .replace(/\s+/g, " ")
    .replace(/[^\w .()\-]/gi, "")
    .replace(/^\.+/, "")
    .trim();
  if (!isValidCdnKey(cleaned)) return null;
  return cleaned;
}

export function randomCdnName(ext: string) {
  const e =
    ext.replace(/^\./, "").replace(/[^A-Za-z0-9]/g, "").slice(0, 12) || "bin";
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  return `${id}.${e}`;
}

/** Path segment encoding (spaces → %20, preserve readable structure) */
export function encodeCdnPathSegment(name: string) {
  return encodeURIComponent(normalizeCdnKey(name));
}

export function cdnEmbedUrl(name: string, base = SITE_URL) {
  return `${base.replace(/\/$/, "")}/${encodeCdnPathSegment(name)}`;
}

export function cdnRawUrl(name: string, base = SITE_URL) {
  return `${base.replace(/\/$/, "")}/r/${encodeCdnPathSegment(name)}`;
}

export type DriveFileMeta = {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  createdTime?: string;
  md5Checksum?: string;
  webViewLink?: string;
  thumbnailLink?: string;
};

export type MediaKind = "image" | "video" | "audio" | "pdf" | "text" | "file";

export function getMediaKind(name: string, mime?: string): MediaKind {
  const m = (mime || "").toLowerCase();
  const ext = name.split(".").pop()?.toLowerCase() || "";

  if (m.startsWith("image/") || /^(png|jpe?g|gif|webp|avif|svg|ico|bmp|heic)$/.test(ext))
    return "image";
  if (
    m.startsWith("video/") ||
    /^(mp4|webm|mkv|mov|m4v|avi|ogv|mpeg|mpg|3gp)$/.test(ext)
  )
    return "video";
  if (m.startsWith("audio/") || /^(mp3|wav|ogg|oga|m4a|flac|aac|opus)$/.test(ext))
    return "audio";
  if (m === "application/pdf" || ext === "pdf") return "pdf";
  if (
    m.startsWith("text/") ||
    /^(txt|md|csv|json|xml|html|css|js|ts|log)$/.test(ext)
  )
    return "text";
  return "file";
}

async function driveFetch(
  path: string,
  init?: RequestInit,
  opts?: { requireWrite?: boolean }
) {
  const { token } = await getAccessToken({
    requireWrite: opts?.requireWrite,
  });
  return fetch(`${DRIVE_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });
}

function escapeDriveQueryValue(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

export async function findFileInCdnFolder(
  key: string
): Promise<DriveFileMeta | null> {
  const name = normalizeCdnKey(key);
  if (!isValidCdnKey(name)) return null;
  const { folderId } = await getAccessToken();

  const q = [
    `'${folderId}' in parents`,
    "trashed = false",
    `name = '${escapeDriveQueryValue(name)}'`,
  ].join(" and ");

  const params = new URLSearchParams({
    q,
    fields:
      "files(id,name,mimeType,size,modifiedTime,createdTime,md5Checksum,webViewLink,thumbnailLink)",
    pageSize: "5",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    corpora: "allDrives",
  });

  const res = await driveFetch(`/files?${params.toString()}`);
  if (!res.ok) {
    const body = await res.text();
    if (
      res.status === 403 &&
      (body.includes("insufficient") ||
        body.includes("Insufficient") ||
        body.includes("ACCESS_TOKEN_SCOPE_INSUFFICIENT"))
    ) {
      throw new Error(
        "Insufficient Google scopes. Disconnect Google Drive, then Connect again and allow Drive access."
      );
    }
    throw new Error(`Drive list failed (${res.status}): ${body.slice(0, 300)}`);
  }

  const data = (await res.json()) as { files?: DriveFileMeta[] };
  const file = data.files?.[0];
  if (!file?.id || !file.name) return null;
  return file;
}

export async function listCdnFiles(limit = 200): Promise<DriveFileMeta[]> {
  const { folderId, token } = await getAccessToken();
  const q = `'${folderId}' in parents and trashed = false`;
  const files: DriveFileMeta[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      q,
      fields:
        "nextPageToken,files(id,name,mimeType,size,modifiedTime,createdTime,md5Checksum,webViewLink,thumbnailLink)",
      pageSize: "100",
      orderBy: "modifiedTime desc",
      supportsAllDrives: "true",
      includeItemsFromAllDrives: "true",
      corpora: "allDrives",
    });
    if (pageToken) params.set("pageToken", pageToken);

    const res = await fetch(`${DRIVE_API}/files?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const body = await res.text();
      if (
        res.status === 403 &&
        (body.includes("insufficient") ||
          body.includes("Insufficient") ||
          body.includes("ACCESS_TOKEN_SCOPE_INSUFFICIENT"))
      ) {
        throw new Error(
          "Insufficient Google scopes. Disconnect Google Drive, then Connect again and allow Drive access."
        );
      }
      throw new Error(
        `Drive list failed (${res.status}): ${body.slice(0, 300)}`
      );
    }
    const data = (await res.json()) as {
      files?: DriveFileMeta[];
      nextPageToken?: string;
    };
    for (const f of data.files || []) {
      if (f.id && f.name) files.push(f);
      if (files.length >= limit) break;
    }
    pageToken = data.nextPageToken;
  } while (pageToken && files.length < limit);

  return files.slice(0, limit);
}

export async function fetchDriveFileMedia(fileId: string) {
  const params = new URLSearchParams({
    alt: "media",
    supportsAllDrives: "true",
  });
  const res = await driveFetch(
    `/files/${encodeURIComponent(fileId)}?${params}`
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Drive download failed (${res.status}): ${body.slice(0, 300)}`
    );
  }
  return res;
}

export async function uploadCdnFile(input: {
  fileName: string;
  mimeType: string;
  data: Buffer | Uint8Array;
}): Promise<DriveFileMeta> {
  const name = sanitizeCdnFileName(input.fileName);
  if (!name) {
    throw new Error(
      "Invalid file name. Use letters, numbers, spaces, dots, dashes (e.g. my photo.png)."
    );
  }

  const existing = await findFileInCdnFolder(name);
  if (existing) {
    throw new Error(
      `A file named "${name}" already exists. Rename it first or choose another name.`
    );
  }

  const { token, folderId } = await getAccessToken({ requireWrite: true });
  const metadata = {
    name,
    parents: [folderId],
  };

  const boundary = `mbp_cdn_${Date.now().toString(36)}`;
  const metaPart = JSON.stringify(metadata);
  const mime = input.mimeType || "application/octet-stream";

  const preamble = Buffer.from(
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metaPart}\r\n--${boundary}\r\nContent-Type: ${mime}\r\n\r\n`,
    "utf8"
  );
  const epilogue = Buffer.from(`\r\n--${boundary}--`, "utf8");
  const body = Buffer.concat([preamble, Buffer.from(input.data), epilogue]);

  const res = await fetch(
    `${DRIVE_UPLOAD}/files?uploadType=multipart&supportsAllDrives=true&fields=id,name,mimeType,size,modifiedTime,createdTime,md5Checksum,webViewLink,thumbnailLink`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body,
    }
  );

  if (!res.ok) {
    const text = await res.text();
    if (text.includes("storage quota") || text.includes("Service Accounts")) {
      throw new Error(
        "Google blocked the upload: connect Google Drive with your Gmail account in Admin CDN, then try again."
      );
    }
    throw new Error(`Upload failed (${res.status}): ${text.slice(0, 400)}`);
  }

  return (await res.json()) as DriveFileMeta;
}

export async function renameCdnFile(
  fileId: string,
  newName: string
): Promise<DriveFileMeta> {
  const name = sanitizeCdnFileName(newName);
  if (!name) throw new Error("Invalid new file name");

  const owned = await getFileIfInCdnFolder(fileId);
  if (!owned) throw new Error("File not found in CDN folder");

  const clash = await findFileInCdnFolder(name);
  if (clash && clash.id !== fileId) {
    throw new Error(`Another file already uses the name "${name}"`);
  }

  const res = await driveFetch(
    `/files/${encodeURIComponent(fileId)}?supportsAllDrives=true&fields=id,name,mimeType,size,modifiedTime,createdTime,md5Checksum,webViewLink,thumbnailLink`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    },
    { requireWrite: true }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Rename failed (${res.status}): ${text.slice(0, 400)}`);
  }

  return (await res.json()) as DriveFileMeta;
}

export async function deleteCdnFile(fileId: string): Promise<void> {
  const owned = await getFileIfInCdnFolder(fileId);
  if (!owned) throw new Error("File not found in CDN folder");

  const res = await driveFetch(
    `/files/${encodeURIComponent(fileId)}?supportsAllDrives=true`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trashed: true }),
    },
    { requireWrite: true }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Delete failed (${res.status}): ${text.slice(0, 400)}`);
  }
}

export async function getFileIfInCdnFolder(
  fileId: string
): Promise<DriveFileMeta | null> {
  const { folderId } = await getAccessToken();
  const res = await driveFetch(
    `/files/${encodeURIComponent(fileId)}?supportsAllDrives=true&fields=id,name,mimeType,size,modifiedTime,createdTime,md5Checksum,webViewLink,thumbnailLink,parents,trashed`
  );
  if (!res.ok) return null;
  const file = (await res.json()) as DriveFileMeta & {
    parents?: string[];
    trashed?: boolean;
  };
  if (file.trashed) return null;
  if (!file.parents?.includes(folderId)) return null;
  return file;
}

export function guessContentType(name: string, mime?: string) {
  if (mime && mime !== "application/octet-stream") return mime;
  const ext = name.split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    avif: "image/avif",
    svg: "image/svg+xml",
    ico: "image/x-icon",
    bmp: "image/bmp",
    heic: "image/heic",
    mp4: "video/mp4",
    webm: "video/webm",
    mkv: "video/x-matroska",
    mov: "video/quicktime",
    m4v: "video/x-m4v",
    avi: "video/x-msvideo",
    mpeg: "video/mpeg",
    mpg: "video/mpeg",
    "3gp": "video/3gpp",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg",
    m4a: "audio/mp4",
    flac: "audio/flac",
    aac: "audio/aac",
    opus: "audio/opus",
    pdf: "application/pdf",
    txt: "text/plain; charset=utf-8",
    md: "text/markdown; charset=utf-8",
    csv: "text/csv; charset=utf-8",
    json: "application/json",
    css: "text/css; charset=utf-8",
    js: "text/javascript; charset=utf-8",
    mjs: "text/javascript; charset=utf-8",
    html: "text/html; charset=utf-8",
    xml: "application/xml",
    zip: "application/zip",
    wasm: "application/wasm",
  };
  return (ext && map[ext]) || "application/octet-stream";
}

export function formatBytes(size?: string | number) {
  const n = typeof size === "string" ? Number(size) : size;
  if (!n || Number.isNaN(n)) return "n/a";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}
