import { NextResponse } from "next/server";
import { createPost, getAllPosts } from "@/lib/db/posts";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await request.json();
  const { title, slug, excerpt, content, author, publishedAt, tags, status } = body;

  if (!title || !slug || typeof content !== "string") {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const post = await createPost({
    title,
    slug,
    excerpt: excerpt ?? "",
    content,
    author: author ?? "",
    publishedAt: publishedAt ?? new Date().toISOString().slice(0, 10),
    tags: Array.isArray(tags) ? tags : [],
    status: status === "published" ? "published" : "draft",
  });
  return NextResponse.json(post, { status: 201 });
}
