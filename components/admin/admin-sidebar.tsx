"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav } from "@/config/site";
import { Logo } from "@/components/marketing/logo";
import { cn } from "@/lib/utils";

function AdminNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
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
              onClick={onNavigate}
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
    </>
  );
}

export function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <aside className="hidden w-56 shrink-0 border-r border-border bg-surface p-3 md:block">
        <AdminNavLinks />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <aside className="absolute inset-y-0 left-0 w-64 overflow-y-auto border-r border-border bg-surface p-3">
            <AdminNavLinks onNavigate={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}
