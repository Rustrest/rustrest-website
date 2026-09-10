"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminNewChangelogEntryPage() {
  const [version, setVersion] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div>
      <PageHeader title="New Changelog Entry" />
      <form className="max-w-xl space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="mb-1 block text-sm text-muted">Version</label>
          <Input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="1.1.0" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <Button type="submit">Create entry</Button>
      </form>
    </div>
  );
}
