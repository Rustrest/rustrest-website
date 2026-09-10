import { NextResponse } from "next/server";
import { createDoc, getAllDocs } from "@/lib/docs";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const docs = await getAllDocs();
  return NextResponse.json(docs);
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await request.json();
  const { title, slug, content, order } = body;

  if (!title || !slug || typeof content !== "string" || typeof order !== "number") {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const doc = await createDoc({ title, slug, content, order });
  return NextResponse.json(doc, { status: 201 });
}
