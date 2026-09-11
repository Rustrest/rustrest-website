import "server-only";
import connectDB from "@/lib/db/mongoose";
import { VisitModel } from "@/models/Visit";
import type { Visit } from "@/types";

interface VisitLean {
  _id: { toString(): string };
  ip: string;
  country?: string;
  region?: string;
  city?: string;
  path: string;
  userAgent?: string;
  createdAt: Date;
}

function toVisit(doc: VisitLean): Visit {
  return {
    id: doc._id.toString(),
    ip: doc.ip,
    country: doc.country ?? null,
    region: doc.region ?? null,
    city: doc.city ?? null,
    path: doc.path,
    userAgent: doc.userAgent ?? null,
    createdAt: doc.createdAt.toISOString(),
  };
}

export async function getAllVisits(): Promise<Visit[]> {
  try {
    await connectDB();
    const visits = await VisitModel.find().sort({ createdAt: -1 }).limit(500).lean<VisitLean[]>();
    return visits.map(toVisit);
  } catch {
    // The DB being briefly unreachable shouldn't crash the whole admin page —
    // an empty list (not fake data, this is real analytics) is the honest state.
    return [];
  }
}

export interface CreateVisitInput {
  ip: string;
  country?: string | null;
  region?: string | null;
  city?: string | null;
  path: string;
  userAgent?: string | null;
}

export async function createVisit(input: CreateVisitInput): Promise<Visit> {
  await connectDB();
  const doc = await VisitModel.create(input);
  return toVisit(doc.toObject());
}

export async function deleteVisit(id: string): Promise<boolean> {
  await connectDB();
  const result = await VisitModel.findByIdAndDelete(id);
  return result !== null;
}
