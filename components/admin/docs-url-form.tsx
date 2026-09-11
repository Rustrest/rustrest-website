"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DocsUrlForm({ initialUrl }: { initialUrl: string }) {
  const router = useRouter();
  const [docsUrl, setDocsUrl] = useState(initialUrl);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    if (!docsUrl.trim()) return;
    setSaving(true);
    setSaved(false);

    await fetch("/api/settings", {
      method: "PUT",
      body: JSON.stringify({ docsUrl: docsUrl.trim() }),
    });

    setSaving(false);
    setSaved(true);
    router.refresh();
  }

  return (
    <div>
      <label className="mb-1 block text-sm text-muted">Docs URL</label>
      <div className="flex flex-wrap items-center gap-2">
        <Input
          value={docsUrl}
          onChange={(e) => {
            setDocsUrl(e.target.value);
            setSaved(false);
          }}
          placeholder="https://…"
          className="max-w-sm"
        />
        <Button type="button" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
        {saved && <span className="text-sm text-muted">Saved</span>}
      </div>
      <p className="mt-1 text-xs text-muted">The site&apos;s /docs link redirects here.</p>
    </div>
  );
}
