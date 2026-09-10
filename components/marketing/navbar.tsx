import Link from "next/link";
import { marketingNav } from "@/config/site";
import { Logo } from "@/components/marketing/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/marketing/theme-toggle";

export function Navbar() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/">
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
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/download">
            <Button size="sm">Download</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
