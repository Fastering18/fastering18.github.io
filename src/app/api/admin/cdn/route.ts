import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  listCdnFiles,
  randomCdnName,
  sanitizeCdnFileName,
  uploadCdnFile,
} from "@/lib/drive/cdn";
import { getDriveAuthStatus } from "@/lib/drive/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await auth();
  if (!session) return null;
  return session;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const status = getDriveAuthStatus();
  if (!status.ready) {
    return NextResponse.json(
      { error: "not_configured", status, files: [] },
      { status: 503 }
    );
  }

  try {
    const files = await listCdnFiles(300);
    return NextResponse.json({ status, files });
  } catch (e) {
    const message = e instanceof Error ? e.message : "list_failed";
    return NextResponse.json(
      { error: "list_failed", message, status },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file_required" }, { status: 400 });
    }

    const customName = String(form.get("name") || "").trim();
    const useRandom = String(form.get("random") || "") === "1";

    let fileName = customName || file.name;
    if (useRandom) {
      const ext = (customName || file.name).split(".").pop() || "bin";
      fileName = randomCdnName(ext);
    }

    const safe = sanitizeCdnFileName(fileName);
    if (!safe) {
      return NextResponse.json(
        {
          error: "invalid_name",
          message:
            "Name must look like file.ext (letters, numbers, dot, dash, underscore).",
        },
        { status: 400 }
      );
    }

    const buf = Buffer.from(await file.arrayBuffer());
    // Soft limit 80MB for serverless friendliness
    if (buf.byteLength > 80 * 1024 * 1024) {
      return NextResponse.json(
        { error: "too_large", message: "Max upload size is 80MB." },
        { status: 413 }
      );
    }

    const uploaded = await uploadCdnFile({
      fileName: safe,
      mimeType: file.type || "application/octet-stream",
      data: buf,
    });

    return NextResponse.json({ ok: true, file: uploaded });
  } catch (e) {
    const message = e instanceof Error ? e.message : "upload_failed";
    return NextResponse.json({ error: "upload_failed", message }, { status: 500 });
  }
}
