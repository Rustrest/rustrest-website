"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function VisitsSearchForm({ initialIp }: { initialIp: string }) {
  const router = useRouter();
  const [ip, setIp] = useState(initialIp);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = ip.trim();
    router.push(trimmed ? `/admin/visitors?ip=${encodeURIComponent(trimmed)}` : "/admin/visitors");
  }

  function handleClear() {
    setIp("");
    router.push("/admin/visitors");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-wrap items-center gap-2">
      <Input
        type="text"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        placeholder="Search by IP…"
        className="max-w-xs"
      />
      <Button type="submit" size="sm">
        Search
      </Button>
      {initialIp && (
        <button
          type="button"
          onClick={handleClear}
          className="text-sm text-muted hover:text-foreground"
        >
          Clear
        </button>
      )}
    </form>
  );
}
