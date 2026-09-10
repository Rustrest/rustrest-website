import "server-only";
import connectDB from "@/lib/db/mongoose";
import { ChangelogModel } from "@/models/Changelog";
import { changelogEntries as fallbackEntries } from "@/lib/data/changelog";
import type { ChangelogEntry } from "@/types";

interface ChangelogLean {
  _id: { toString(): string };
  version: string;
  title: string;
  description: string;
  publishedAt: string;
  tag: "added" | "fixed" | "improved" | "removed";
}

function toChangelogEntry(entry: ChangelogLean): ChangelogEntry {
  return {
    id: entry._id.toString(),
    version: entry.version,
    title: entry.title,
    description: entry.description,
    publishedAt: entry.publishedAt,
    tag: entry.tag,
  };
}

// Falls back to the built-in sample content when the database is empty or
// unreachable, so the site always has something to show.
export async function getAllChangelogEntries(): Promise<ChangelogEntry[]> {
  try {
    await connectDB();
    const entries = await ChangelogModel.find()
      .sort({ publishedAt: -1 })
      .lean<ChangelogLean[]>();
    if (entries.length > 0) return entries.map(toChangelogEntry);
  } catch {
    // fall through to the static fallback below
  }
  return fallbackEntries;
}

export async function getChangelogEntryById(id: string): Promise<ChangelogEntry | null> {
  const entries = await getAllChangelogEntries();
  return entries.find((entry) => entry.id === id) ?? null;
}

export async function createChangelogEntry(
  input: Omit<ChangelogEntry, "id">
): Promise<ChangelogEntry> {
  await connectDB();
  const entry = await ChangelogModel.create(input);
  return toChangelogEntry(entry.toObject());
}

export async function updateChangelogEntry(
  id: string,
  input: Omit<ChangelogEntry, "id">
): Promise<ChangelogEntry | null> {
  await connectDB();
  const entry = await ChangelogModel.findByIdAndUpdate(id, input, {
    new: true,
  }).lean<ChangelogLean | null>();
  return entry ? toChangelogEntry(entry) : null;
}

export async function deleteChangelogEntry(id: string): Promise<boolean> {
  await connectDB();
  const result = await ChangelogModel.findByIdAndDelete(id);
  return result !== null;
}
