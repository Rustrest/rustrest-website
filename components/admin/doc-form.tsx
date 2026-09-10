"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import type { DocPage } from "@/types";

export function DocForm({ doc }: { doc?: DocPage }) {
  const [title, setTitle] = useState(doc?.title ?? "");
  const [slug, setSlug] = useState(doc?.slug ?? "");
  const [order, setOrder] = useState(String(doc?.order ?? 1));
  const [content, setContent] = useState(doc?.content ?? "");

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
        <label className="mb-1 block text-sm text-muted">Slug</label>
        <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="getting-started" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-muted">Sidebar order</label>
        <Input
          type="number"
          min={1}
          step={1}
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          onBlur={() => {
            const parsed = Math.trunc(Number(order));
            setOrder(String(Number.isFinite(parsed) && parsed >= 1 ? parsed : 1));
          }}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-muted">Content</label>
        <MarkdownEditor value={content} onChange={setContent} placeholder="Write this doc page in Markdown…" />
      </div>
      <Button type="submit">{doc ? "Save changes" : "Create page"}</Button>
    </form>
  );
}
