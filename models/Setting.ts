import "server-only";
import { Schema, model, models } from "mongoose";

// Singleton document (fixed _id) holding site-wide settings editable from the admin panel.
const settingSchema = new Schema({
  _id: { type: String, default: "site" },
  docsUrl: { type: String, default: "https://muhammadtopu.github.io/rustrest-docs/" },
});

export const SettingModel = models.Setting ?? model("Setting", settingSchema, "settings");
