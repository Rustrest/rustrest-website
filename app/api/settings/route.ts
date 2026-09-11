import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/db/settings";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await request.json();
  const { docsUrl } = body;

  if (typeof docsUrl !== "string" || !docsUrl.trim()) {
    return NextResponse.json({ error: "Missing or invalid docsUrl" }, { status: 400 });
  }

  const settings = await updateSiteSettings({ docsUrl: docsUrl.trim() });
  return NextResponse.json(settings);
}
