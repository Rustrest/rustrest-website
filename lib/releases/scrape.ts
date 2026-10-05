import "server-only";
import * as cheerio from "cheerio";
import type { AnyNode } from "domhandler";
import { siteConfig } from "@/config/site";
import type { ReleaseAsset, ReleaseInfo } from "./types";

const repoPath = new URL(siteConfig.links.github).pathname.replace(/^\/|\/$/g, "");
const releasesUrl = `https://github.com/${repoPath}/releases`;

// Safety guard against runaway pagination if GitHub's markup ever changes shape.
const MAX_LISTING_PAGES = 20;

function classifyAsset(name: string): Pick<ReleaseAsset, "os" | "arch"> | null {
  if (name.endsWith(".sha256") || name === "dist-manifest.json" || name === "sha256.sum") return null;
  // Only the main rustrest binary — not the js-lsp/remote-agent sidecar tools.
  if (!/^rustrest-(aarch64|x86_64)-/.test(name)) return null;

  const arch: ReleaseAsset["arch"] | null = name.includes("aarch64")
    ? "aarch64"
    : name.includes("x86_64")
      ? "x86_64"
      : null;
  if (!arch) return null;

  if (name.includes("pc-windows")) return { os: "windows", arch };
  if (name.includes("apple-darwin")) return { os: "mac", arch };
  if (name.includes("unknown-linux")) return { os: "linux", arch };
  return null;
}

async function fetchHtml(url: string, revalidate: number): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; rustrest-site-bot)" },
      next: { revalidate },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function extractAssets($: cheerio.CheerioAPI, scope: cheerio.Cheerio<AnyNode>): ReleaseAsset[] {
  const byName = new Map<string, ReleaseAsset>();
  scope.find("a[href*='/releases/download/']").each((_, el) => {
    const href = $(el).attr("href");
    const name = href?.split("/").pop();
    if (!href || !name || byName.has(name)) return;

    const classified = classifyAsset(name);
    if (!classified) return;

    byName.set(name, { name, url: new URL(href, "https://github.com").toString(), ...classified });
  });
  return [...byName.values()];
}

// Scrapes the public releases page's HTML directly (no GitHub API calls, so no
// token/rate-limit concerns). The latest release's assets are rendered inline
// in the page's initial HTML, so no headless browser is needed.
export async function getLatestRelease(): Promise<ReleaseInfo | null> {
  const html = await fetchHtml(releasesUrl, 3600);
  if (!html) return null;

  const $ = cheerio.load(html);
  const section = $("section[id^='release-v']").first();
  const version = section.attr("id")?.replace("release-", "");
  if (!version) return null;

  const assets = extractAssets($, section);
  if (assets.length === 0) return null;

  return { version, htmlUrl: `${releasesUrl}/tag/${version}`, assets };
}

// Walks every page of the releases listing, newest first. Only the first
// release on each page has its assets expanded inline — older ones are
// lazy-loaded behind a `releases/expanded_assets/<tag>` fragment, which we
// fetch separately and cache far longer since past releases never change.
export async function getAllReleases(): Promise<ReleaseInfo[]> {
  const releases: ReleaseInfo[] = [];
  let pageUrl: string | null = releasesUrl;

  for (let page = 0; pageUrl && page < MAX_LISTING_PAGES; page += 1) {
    const html = await fetchHtml(pageUrl, 3600);
    if (!html) break;

    const $ = cheerio.load(html);

    for (const el of $("section[id^='release-v']").toArray()) {
      const section = $(el);
      const version = section.attr("id")?.replace("release-", "");
      if (!version) continue;

      let assets = extractAssets($, section);
      if (assets.length === 0) {
        const fragmentHtml = await fetchHtml(`${releasesUrl}/expanded_assets/${version}`, 86400);
        if (fragmentHtml) {
          const $frag = cheerio.load(fragmentHtml);
          assets = extractAssets($frag, $frag.root());
        }
      }

      if (assets.length > 0) {
        releases.push({ version, htmlUrl: `${releasesUrl}/tag/${version}`, assets });
      }
    }

    const nextHref = $("a.next_page").attr("href");
    pageUrl = nextHref ? new URL(nextHref, "https://github.com").toString() : null;
  }

  return releases;
}
