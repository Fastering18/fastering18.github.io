import { getAccessToken } from "./auth";

const NAME_RE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,180}\.[A-Za-z0-9]{1,16}$/;
const DRIVE_API = "https://www.googleapis.com/drive/v3";

export function isValidCdnKey(key: string) {
  if (!key || key.includes("/") || key.includes("..")) return false;
  return NAME_RE.test(key);
}

export type DriveFileMeta = {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  md5Checksum?: string;
};

async function driveFetch(path: string, init?: RequestInit) {
  const { token } = await getAccessToken();
  const res = await fetch(`${DRIVE_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });
  return res;
}

export async function findFileInCdnFolder(
  key: string
): Promise<DriveFileMeta | null> {
  if (!isValidCdnKey(key)) return null;
  const { folderId } = await getAccessToken();

  const q = [
    `'${folderId}' in parents`,
    "trashed = false",
    `name = '${key.replace(/'/g, "\\'")}'`,
  ].join(" and ");

  const params = new URLSearchParams({
    q,
    fields: "files(id,name,mimeType,size,modifiedTime,md5Checksum)",
    pageSize: "5",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    corpora: "allDrives",
  });

  const res = await driveFetch(`/files?${params.toString()}`);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Drive list failed (${res.status}): ${body.slice(0, 300)}`);
  }

  const data = (await res.json()) as { files?: DriveFileMeta[] };
  const file = data.files?.[0];
  if (!file?.id || !file.name) return null;
  return file;
}

export async function listCdnFiles(limit = 100): Promise<DriveFileMeta[]> {
  const { folderId } = await getAccessToken();
  const q = `'${folderId}' in parents and trashed = false`;
  const params = new URLSearchParams({
    q,
    fields: "files(id,name,mimeType,size,modifiedTime,md5Checksum)",
    pageSize: String(Math.min(limit, 200)),
    orderBy: "modifiedTime desc",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    corpora: "allDrives",
  });

  const res = await driveFetch(`/files?${params.toString()}`);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Drive list failed (${res.status}): ${body.slice(0, 300)}`);
  }

  const data = (await res.json()) as { files?: DriveFileMeta[] };
  return (data.files || []).filter((f) => f.id && f.name);
}

export async function fetchDriveFileMedia(fileId: string) {
  const params = new URLSearchParams({
    alt: "media",
    supportsAllDrives: "true",
  });
  const res = await driveFetch(`/files/${encodeURIComponent(fileId)}?${params}`);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Drive download failed (${res.status}): ${body.slice(0, 300)}`);
  }
  return res;
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
    mp4: "video/mp4",
    webm: "video/webm",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    pdf: "application/pdf",
    txt: "text/plain; charset=utf-8",
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
