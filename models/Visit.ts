import "server-only";
import { Schema, model, models } from "mongoose";

const visitSchema = new Schema({
  ip: { type: String, required: true },
  country: { type: String },
  region: { type: String },
  city: { type: String },
  path: { type: String, required: true },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const VisitModel = models.Visit ?? model("Visit", visitSchema, "visits");
