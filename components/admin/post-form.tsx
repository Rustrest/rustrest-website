"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import type { BlogPost } from "@/types";

export function PostForm({ post }: { post?: BlogPost }) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");

  return (
    <form
      className="mx-auto max-w-2xl space-y-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <div>
        <label className="mb-1 block text-sm text-muted">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label className="mb-1 block text-sm text-muted">Excerpt</label>
        <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </div>
      <div>
        <label className="mb-1 block text-sm text-muted">Content</label>
        <MarkdownEditor value={content} onChange={setContent} placeholder="Write your post in Markdown…" />
      </div>
      <Button type="submit">{post ? "Save changes" : "Create post"}</Button>
    </form>
  );
}
