import { NextResponse } from "next/server";
import { deletePost, getPostById, updatePost } from "@/lib/db/posts";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const body = await request.json();
  const { title, slug, excerpt, content, author, publishedAt, tags, status } = body;

  if (!title || !slug || typeof content !== "string") {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const post = await updatePost(id, {
    title,
    slug,
    excerpt: excerpt ?? "",
    content,
    author: author ?? "",
    publishedAt: publishedAt ?? new Date().toISOString().slice(0, 10),
    tags: Array.isArray(tags) ? tags : [],
    status: status === "published" ? "published" : "draft",
  });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const deleted = await deletePost(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}
