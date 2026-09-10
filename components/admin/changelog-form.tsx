"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ChangelogEntry } from "@/types";

const TAGS: ChangelogEntry["tag"][] = ["added", "fixed", "improved", "removed"];

export function ChangelogForm({ entry }: { entry?: ChangelogEntry }) {
  const router = useRouter();
  const [version, setVersion] = useState(entry?.version ?? "");
  const [title, setTitle] = useState(entry?.title ?? "");
  const [description, setDescription] = useState(entry?.description ?? "");
  const [tag, setTag] = useState<ChangelogEntry["tag"]>(entry?.tag ?? "added");
  const [publishedAt, setPublishedAt] = useState(
    entry?.publishedAt ?? new Date().toISOString().slice(0, 10)
  );
  const [saving, setSaving] = useState(false);

  async function handleSubmit() {
    if (!version.trim() || !title.trim()) return;
    setSaving(true);

    const body = JSON.stringify({
      version: version.trim(),
      title: title.trim(),
      description: description.trim(),
      tag,
      publishedAt,
    });

    if (entry) {
      await fetch(`/api/changelog/${entry.id}`, { method: "PUT", body });
    } else {
      await fetch("/api/changelog", { method: "POST", body });
    }

    router.push("/admin/changelog");
    router.refresh();
  }

  return (
    <form className="mx-auto max-w-xl space-y-4" onSubmit={(event) => event.preventDefault()}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 block text-sm text-muted">Version</label>
          <Input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="1.1.0" />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-sm text-muted">Tag</label>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value as ChangelogEntry["tag"])}
            className="h-9 w-full rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-brand"
          >
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm text-muted">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label className="mb-1 block text-sm text-muted">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-24 w-full rounded-md border border-border bg-surface p-3 text-sm text-foreground outline-none focus:border-brand"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-muted">Published date</label>
        <Input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
      </div>
      <Button type="button" onClick={handleSubmit} disabled={saving}>
        {saving ? "Saving…" : entry ? "Save changes" : "Create entry"}
      </Button>
    </form>
  );
}
