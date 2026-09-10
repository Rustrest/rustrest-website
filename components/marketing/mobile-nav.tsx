"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { marketingNav } from "@/config/site";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-foreground"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 z-50 border-b border-border bg-background px-6 py-4 shadow-sm">
          <nav className="flex flex-col gap-1">
            {marketingNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-muted hover:bg-surface hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/download" onClick={() => setOpen(false)} className="mt-3 block">
            <Button size="sm" className="w-full">
              Download
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
