import { NextResponse } from "next/server";
import { createVisit, getVisitsPage } from "@/lib/db/visits";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 20;
  const ip = searchParams.get("ip") ?? undefined;

  const result = await getVisitsPage({ page, pageSize, ip });
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await request.json();
  const { ip, country, region, city, path, userAgent } = body;

  if (!ip || !path) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const visit = await createVisit({ ip, country, region, city, path, userAgent });
  return NextResponse.json(visit, { status: 201 });
}
