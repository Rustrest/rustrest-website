import "server-only";
import type { Platform } from "@/lib/platform";
import { siteConfig } from "@/config/site";
import { getAllReleases, getLatestRelease } from "@/lib/releases/scrape";
import { selectPlatformDownload } from "@/lib/releases/select";
import type { ReleaseAsset, ReleaseInfo } from "@/lib/releases/types";

export const githubReleasesUrl = `${siteConfig.links.github}/releases`;

export interface DownloadOption {
  platform: Exclude<Platform, "unknown">;
  label: string;
  href: string;
  external: boolean;
  version: string | null;
  alternates: ReleaseAsset[];
}

const PLATFORM_LABELS: Record<Exclude<Platform, "unknown">, string> = {
  mac: "macOS",
  linux: "Linux",
  windows: "Windows",
};

// mac/linux route to an internal page with the install script; Windows has
// no install script, so it links straight to the scraped .zip asset.
const INSTALL_PAGES: Partial<Record<Exclude<Platform, "unknown">, string>> = {
  mac: "/download/mac",
  linux: "/download/linux",
};

export async function getDownloadOptions(): Promise<
  Record<Exclude<Platform, "unknown">, DownloadOption>
> {
  const release = await getLatestRelease();

  const build = (platform: Exclude<Platform, "unknown">): DownloadOption => {
    const picked = release ? selectPlatformDownload(release, platform) : null;
    const installPage = INSTALL_PAGES[platform];

    if (installPage) {
      return {
        platform,
        label: PLATFORM_LABELS[platform],
        href: installPage,
        external: false,
        version: release?.version ?? null,
        alternates: picked?.alternates ?? [],
      };
    }

    return {
      platform,
      label: PLATFORM_LABELS[platform],
      href: picked?.primary.url ?? githubReleasesUrl,
      external: true,
      version: release?.version ?? null,
      alternates: picked?.alternates ?? [],
    };
  };

  return {
    mac: build("mac"),
    linux: build("linux"),
    windows: build("windows"),
  };
}

// For platform pages that need the direct binary links (not the install
// script route), regardless of INSTALL_PAGES above.
export async function getPlatformBinaryLinks(platform: Exclude<Platform, "unknown">) {
  const release = await getLatestRelease();
  if (!release) return null;

  const picked = selectPlatformDownload(release, platform);
  if (!picked) return null;

  return { version: release.version, ...picked };
}

const ARCH_LABELS: Record<Exclude<Platform, "unknown">, Record<ReleaseAsset["arch"], string>> = {
  mac: { aarch64: "Apple Silicon", x86_64: "Intel" },
  windows: { aarch64: "Arm64", x86_64: "x64" },
  linux: { aarch64: "Arm64", x86_64: "x64" },
};

function fileTypeFromName(name: string): string {
  if (name.endsWith(".tar.xz")) return "TAR.XZ";
  if (name.endsWith(".zip")) return "ZIP";
  return name.split(".").pop()?.toUpperCase() ?? "FILE";
}

export interface DownloadAssetView {
  label: string;
  archLabel: string;
  fileType: string;
  url: string;
  recommended: boolean;
}

export interface DownloadPlatformView {
  platform: Exclude<Platform, "unknown">;
  label: string;
  assets: DownloadAssetView[];
}

export interface DownloadsData {
  version: string | null;
  platforms: DownloadPlatformView[];
}

const PLATFORM_ORDER = ["windows", "mac", "linux"] as const;

function buildDownloadsData(release: ReleaseInfo | null): DownloadsData {
  const platforms: DownloadPlatformView[] = PLATFORM_ORDER.map((platform) => {
    const picked = release ? selectPlatformDownload(release, platform) : null;
    const assets: DownloadAssetView[] = picked
      ? [picked.primary, ...picked.alternates].map((asset) => ({
          label: `${PLATFORM_LABELS[platform]} ${ARCH_LABELS[platform][asset.arch]}`,
          archLabel: ARCH_LABELS[platform][asset.arch],
          fileType: fileTypeFromName(asset.name),
          url: asset.url,
          recommended: asset === picked.primary,
        }))
      : [];

    return { platform, label: PLATFORM_LABELS[platform], assets };
  });

  return { version: release?.version ?? null, platforms };
}

// Full view-model for the /download hub page: every platform, every arch
// variant, with the preferred one flagged as recommended.
export async function getAllDownloads(): Promise<DownloadsData> {
  const release = await getLatestRelease();
  return buildDownloadsData(release);
}

// One view-model per past release, newest first, for the version history page.
export async function getReleaseHistory(): Promise<DownloadsData[]> {
  const releases = await getAllReleases();
  return releases.map(buildDownloadsData);
}
