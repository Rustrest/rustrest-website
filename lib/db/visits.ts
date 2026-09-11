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

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export interface VisitsQuery {
  page?: number;
  pageSize?: number;
  ip?: string;
}

export interface VisitsPage {
  visits: Visit[];
  total: number;
  page: number;
  pageSize: number;
}

// Paginated + searchable-by-IP — the table only ever loads one page's worth
// from the DB, not the whole collection, so this stays fast no matter how
// many visits accumulate.
export async function getVisitsPage({ page = 1, pageSize = 20, ip }: VisitsQuery): Promise<VisitsPage> {
  const safePage = Math.max(1, page);
  try {
    await connectDB();
    const filter = ip?.trim() ? { ip: { $regex: escapeRegExp(ip.trim()), $options: "i" } } : {};

    const [docs, total] = await Promise.all([
      VisitModel.find(filter)
        .sort({ createdAt: -1 })
        .skip((safePage - 1) * pageSize)
        .limit(pageSize)
        .lean<VisitLean[]>(),
      VisitModel.countDocuments(filter),
    ]);

    return { visits: docs.map(toVisit), total, page: safePage, pageSize };
  } catch {
    return { visits: [], total: 0, page: safePage, pageSize };
  }
}

export interface VisitStats {
  total: number;
  uniqueIps: number;
  uniqueCountries: number;
}

// Uses DB-level counts/distinct instead of loading every document into
// memory, so these stay accurate and cheap regardless of collection size.
export async function getVisitStats(): Promise<VisitStats> {
  try {
    await connectDB();
    const [total, uniqueIps, uniqueCountries] = await Promise.all([
      VisitModel.countDocuments(),
      VisitModel.distinct("ip"),
      VisitModel.distinct("country", { country: { $ne: null } }),
    ]);
    return { total, uniqueIps: uniqueIps.length, uniqueCountries: uniqueCountries.length };
  } catch {
    return { total: 0, uniqueIps: 0, uniqueCountries: 0 };
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
