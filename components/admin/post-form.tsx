"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import type { BlogPost } from "@/types";

export function PostForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [author, setAuthor] = useState(post?.author ?? "");
  const [status, setStatus] = useState<BlogPost["status"]>(post?.status ?? "draft");
  const [content, setContent] = useState(post?.content ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit() {
    if (!title.trim() || !slug.trim()) return;
    setSaving(true);

    const body = JSON.stringify({
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      author: author.trim(),
      status,
      content,
      publishedAt: post?.publishedAt ?? new Date().toISOString().slice(0, 10),
      tags: post?.tags ?? [],
    });

    if (post) {
      await fetch(`/api/blog/${post.id}`, { method: "PUT", body });
    } else {
      await fetch("/api/blog", { method: "POST", body });
    }

    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <form className="mx-auto max-w-2xl space-y-4" onSubmit={(event) => event.preventDefault()}>
      <div>
        <label className="mb-1 block text-sm text-muted">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label className="mb-1 block text-sm text-muted">Slug</label>
        <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="welcome-to-rustrest" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-muted">Excerpt</label>
        <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 block text-sm text-muted">Author</label>
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-sm text-muted">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as BlogPost["status"])}
            className="h-9 w-full rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-brand"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm text-muted">Content</label>
        <MarkdownEditor value={content} onChange={setContent} placeholder="Write your post in Markdown…" />
      </div>
      <Button type="button" onClick={handleSubmit} disabled={saving}>
        {saving ? "Saving…" : post ? "Save changes" : "Create post"}
      </Button>
    </form>
  );
}
