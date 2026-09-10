import Link from "next/link";
import { marketingNav } from "@/config/site";
import { Logo } from "@/components/marketing/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/marketing/theme-toggle";
import { MobileNav } from "@/components/marketing/mobile-nav";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" data-site-logo-target>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {marketingNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link href="/download" className="hidden md:block">
            <Button size="sm">Download</Button>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
