import type { Platform } from "@/lib/platform";
import type { ReleaseAsset, ReleaseInfo, ReleaseOs } from "./types";

export interface PlatformDownload {
  primary: ReleaseAsset;
  alternates: ReleaseAsset[];
}

const PREFERRED_ARCH: Record<ReleaseOs, ReleaseAsset["arch"]> = {
  mac: "aarch64", // Apple Silicon has been the default Mac since 2023
  windows: "x86_64",
  linux: "x86_64",
};

export function selectPlatformDownload(
  release: ReleaseInfo,
  platform: Exclude<Platform, "unknown">
): PlatformDownload | null {
  const assets = release.assets.filter((asset) => asset.os === platform);
  if (assets.length === 0) return null;

  const preferredArch = PREFERRED_ARCH[platform];
  const primary = assets.find((asset) => asset.arch === preferredArch) ?? assets[0];
  const alternates = assets.filter((asset) => asset !== primary);

  return { primary, alternates };
}
