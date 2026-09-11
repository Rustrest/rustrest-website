import { NextResponse } from "next/server";
import { createVisit, getAllVisits } from "@/lib/db/visits";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const visits = await getAllVisits();
  return NextResponse.json(visits);
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
