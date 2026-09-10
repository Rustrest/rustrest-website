import "server-only";
import { Schema, model, models } from "mongoose";

const changelogSchema = new Schema({
  version: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  publishedAt: { type: String, required: true },
  tag: { type: String, enum: ["added", "fixed", "improved", "removed"], default: "added" },
});

export const ChangelogModel = models.Changelog ?? model("Changelog", changelogSchema, "changelog");
