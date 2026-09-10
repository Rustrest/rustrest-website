import { NextResponse } from "next/server";
import { createChangelogEntry, getAllChangelogEntries } from "@/lib/db/changelog";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const entries = await getAllChangelogEntries();
  return NextResponse.json(entries);
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await request.json();
  const { version, title, description, publishedAt, tag } = body;

  if (!version || !title || typeof description !== "string") {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const validTags = ["added", "fixed", "improved", "removed"];
  const entry = await createChangelogEntry({
    version,
    title,
    description,
    publishedAt: publishedAt ?? new Date().toISOString().slice(0, 10),
    tag: validTags.includes(tag) ? tag : "added",
  });
  return NextResponse.json(entry, { status: 201 });
}
