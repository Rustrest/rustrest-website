"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/marketing/theme-toggle";
import { useAdminAuthStore } from "@/store/use-admin-auth-store";

export function AdminTopbar() {
  const router = useRouter();
  const logout = useAdminAuthStore((state) => state.logout);

  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-6">
      <span className="text-sm text-muted">Content & user management</span>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            logout();
            router.push("/admin/login");
          }}
        >
          Log out
        </Button>
      </div>
    </header>
  );
}
