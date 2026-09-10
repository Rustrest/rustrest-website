"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/marketing/theme-toggle";

export function AdminTopbar() {
  const router = useRouter();

  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-6">
      <span className="text-sm text-muted">Content & user management</span>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          size="sm"
          variant="ghost"
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
          }}
        >
          Log out
        </Button>
      </div>
    </header>
  );
}
