export type ReleaseOs = "windows" | "mac" | "linux";
export type ReleaseArch = "x86_64" | "aarch64";

export interface ReleaseAsset {
  name: string;
  url: string;
  os: ReleaseOs;
  arch: ReleaseArch;
}

export interface ReleaseInfo {
  version: string;
  htmlUrl: string;
  assets: ReleaseAsset[];
}
