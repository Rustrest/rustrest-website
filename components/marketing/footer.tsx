import Link from "next/link";
import { GithubIcon } from "@/components/icons/github-icon";
import { Logo } from "@/components/marketing/logo";
import { siteConfig } from "@/config/site";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Download", href: "/download" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "GitHub", href: siteConfig.links.github },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-sm text-muted">{siteConfig.description}</p>
            <Link
              href={siteConfig.links.github}
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
            >
              <GithubIcon className="h-4 w-4" />
              Star on GitHub
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:flex sm:gap-16">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-sm font-semibold text-foreground">{column.title}</p>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Open source, built with Rust.
          </p>
        </div>
      </div>
    </footer>
  );
}
