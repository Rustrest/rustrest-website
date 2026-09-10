import "server-only";
import { headers } from "next/headers";
import { detectPlatform, type Platform } from "@/lib/platform";

// Reads the request's User-Agent header so the correct platform is baked
// into the first server-rendered response — no client-side flicker.
export async function getServerPlatform(): Promise<Platform> {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") ?? "";
  return detectPlatform(userAgent);
}
