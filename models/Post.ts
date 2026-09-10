import "server-only";
import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, default: "" },
  content: { type: String, required: true },
  author: { type: String, default: "" },
  publishedAt: { type: String, required: true },
  coverImage: { type: String },
  tags: { type: [String], default: [] },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
});

export const PostModel = models.Post ?? model("Post", postSchema, "posts");
