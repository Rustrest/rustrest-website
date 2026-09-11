import "server-only";
import connectDB from "@/lib/db/mongoose";
import { SettingModel } from "@/models/Setting";

const DEFAULT_DOCS_URL = "https://muhammadtopu.github.io/rustrest-docs/";

export interface SiteSettings {
  docsUrl: string;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    await connectDB();
    const doc = await SettingModel.findById("site").lean<{ docsUrl?: string }>();
    return { docsUrl: doc?.docsUrl?.trim() || DEFAULT_DOCS_URL };
  } catch {
    return { docsUrl: DEFAULT_DOCS_URL };
  }
}

export async function updateSiteSettings(input: Partial<SiteSettings>): Promise<SiteSettings> {
  await connectDB();
  const doc = await SettingModel.findByIdAndUpdate(
    "site",
    { $set: input },
    { upsert: true, new: true }
  ).lean<{ docsUrl?: string }>();
  return { docsUrl: doc?.docsUrl?.trim() || DEFAULT_DOCS_URL };
}
