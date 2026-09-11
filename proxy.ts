import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { createVisit } from "@/lib/db/visits";
import { lookupIpGeo } from "@/lib/geo";

const ADMIN_SESSION_COOKIE = "admin_session";

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// Silent visitor logging — never shown on the public site, purely for the
// admin dashboard. Runs in the background via waitUntil so it can never slow
// down or break an actual page request.
async function logVisit(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const geo = await lookupIpGeo(ip);
    await createVisit({
      ip,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      path: request.nextUrl.pathname,
      userAgent: request.headers.get("user-agent"),
    });
  } catch {
    // best-effort analytics — a failure here must never affect the request
  }
}

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname !== "/admin/login") {
      const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
      const secret = process.env.ADMIN_SESSION_SECRET;

      if (!secret || token !== secret) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }
  } else {
    event.waitUntil(logVisit(request));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico|site-images).*)"],
};
