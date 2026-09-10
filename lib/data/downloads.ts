import type { Platform } from "@/lib/platform";
import { siteConfig } from "@/config/site";

export const githubReleasesUrl = `${siteConfig.links.github}/releases`;

export interface DownloadOption {
  platform: Platform;
  label: string;
  href: string;
  external: boolean;
}

// Windows redirects straight to the GitHub release .zip; macOS/Linux route to
// an internal page with the install script since there's no single binary link.
export const downloadOptions: Record<Exclude<Platform, "unknown">, DownloadOption> = {
  mac: { platform: "mac", label: "macOS", href: "/download/mac", external: false },
  linux: { platform: "linux", label: "Linux", href: "/download/linux", external: false },
  windows: { platform: "windows", label: "Windows", href: githubReleasesUrl, external: true },
};
