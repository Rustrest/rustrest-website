"use client";

import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/marketing/theme-toggle";

export function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();

  return (
    <header className="flex h-14 items-center justify-between gap-2 border-b border-border px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-foreground md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="truncate text-sm text-muted">Content & user management</span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
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
