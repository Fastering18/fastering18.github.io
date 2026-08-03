import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deleteCdnFile, renameCdnFile } from "@/lib/drive/cdn";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await auth();
  return session ? true : false;
}

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await ctx.params;
    const body = await req.json().catch(() => ({}));
    const name = String(body?.name || "").trim();
    if (!name) {
      return NextResponse.json({ error: "name_required" }, { status: 400 });
    }

    const file = await renameCdnFile(id, name);
    return NextResponse.json({ ok: true, file });
  } catch (e) {
    const message = e instanceof Error ? e.message : "rename_failed";
    return NextResponse.json({ error: "rename_failed", message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await ctx.params;
    await deleteCdnFile(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "delete_failed";
    return NextResponse.json({ error: "delete_failed", message }, { status: 500 });
  }
}
