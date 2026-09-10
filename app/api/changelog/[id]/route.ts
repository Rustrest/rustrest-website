import { NextResponse } from "next/server";
import { deleteChangelogEntry, getChangelogEntryById, updateChangelogEntry } from "@/lib/db/changelog";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const entry = await getChangelogEntryById(id);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(entry);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const body = await request.json();
  const { version, title, description, publishedAt, tag } = body;

  if (!version || !title || typeof description !== "string") {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const validTags = ["added", "fixed", "improved", "removed"];
  const entry = await updateChangelogEntry(id, {
    version,
    title,
    description,
    publishedAt: publishedAt ?? new Date().toISOString().slice(0, 10),
    tag: validTags.includes(tag) ? tag : "added",
  });
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(entry);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const deleted = await deleteChangelogEntry(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}
