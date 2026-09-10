export type Platform = "mac" | "windows" | "linux" | "unknown";

export function detectPlatform(userAgent: string): Platform {
  const ua = userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "mac";
  if (ua.includes("linux") && !ua.includes("android")) return "linux";
  return "unknown";
}
