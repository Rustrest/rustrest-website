"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav } from "@/config/site";
import { Logo } from "@/components/marketing/logo";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-border bg-surface p-3">
      <div className="px-2" data-site-logo-target>
        <Logo />
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">Admin</p>
      </div>
      <nav className="mt-4 space-y-0.5">
        {adminNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md px-2 py-1.5 text-sm text-muted hover:bg-background hover:text-foreground",
                active && "bg-background text-foreground"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
