import "server-only";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_SESSION_COOKIE = "admin_session";

// The session "token" is just the server-only secret itself — it never
// reaches the client (the cookie is httpOnly), so there's nothing to forge
// without already having access to the server's environment.
function getSecret(): string | undefined {
  return process.env.ADMIN_SESSION_SECRET;
}

export function isValidSessionToken(token: string | undefined): boolean {
  const secret = getSecret();
  return Boolean(secret) && token === secret;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return isValidSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_MAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return false;
  return email === adminEmail && password === adminPassword;
}

// Route handlers call this first; a non-null return means "stop and send this
// response" (401), so callers can just do: `const denied = await requireAdmin(); if (denied) return denied;`
export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdminAuthenticated()) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
