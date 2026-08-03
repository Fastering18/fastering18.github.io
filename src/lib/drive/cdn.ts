import { getAccessToken } from "./auth";

const NAME_RE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,180}\.[A-Za-z0-9]{1,16}$/;
const DRIVE_API = "https://www.googleapis.com/drive/v3";
const DRIVE_UPLOAD = "https://www.googleapis.com/upload/drive/v3";

export function isValidCdnKey(key: string) {
  if (!key || key.includes("/") || key.includes("..")) return false;
  return NAME_RE.test(key);
}

export function sanitizeCdnFileName(name: string): string | null {
  const base = name.split(/[/\\]/).pop()?.trim() || "";
  // spaces -> underscores, strip unsafe chars
  const cleaned = base
    .replace(/\s+/g, "_")
    .replace(/[^A-Za-z0-9._-]/g, "")
    .replace(/^\.+/, "");
  if (!isValidCdnKey(cleaned)) return null;
  return cleaned;
}

export function randomCdnName(ext: string) {
  const e = ext.replace(/^\./, "").replace(/[^A-Za-z0-9]/g, "").slice(0, 12) || "bin";
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  return `${id}.${e}`;
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
      throw new Error(`Drive list failed (${res.status}): ${body.slice(0, 300)}`);
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
      "Invalid file name. Use something like photo.png or a8f3c1.webp"
    );
  }

  // Avoid duplicate names in folder (short URL uniqueness)
  const existing = await findFileInCdnFolder(name);
  if (existing) {
    throw new Error(
      `A file named "${name}" already exists. Rename it first or choose another name.`
    );
  }

  const { token, folderId } = await getAccessToken();
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
  const body = Buffer.concat([
    preamble,
    Buffer.from(input.data),
    epilogue,
  ]);

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

  // Ensure file is in CDN folder
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
    }
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

  // Soft-delete to trash (safer than permanent delete)
  const res = await driveFetch(
    `/files/${encodeURIComponent(fileId)}?supportsAllDrives=true`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trashed: true }),
    }
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

export function formatBytes(size?: string | number) {
  const n = typeof size === "string" ? Number(size) : size;
  if (!n || Number.isNaN(n)) return "n/a";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}
