import mongoose, { Document, Schema } from "mongoose";

export interface IPeekySettings extends Document {
  id: string;
  stream?: boolean;
  interval?: number;
  quality?: number;
  width?: number;
  height?: number;
}

const PeekySettingsSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    stream: { type: Boolean, default: false },
    interval: { type: Number, min: 500, max: 60000, default: 5000 },
    quality: { type: Number, min: 10, max: 63, default: 15 },
    width: { type: Number, min: 1, max: 1920, default: 640 },
    height: { type: Number, min: 1, max: 1080, default: 480 },
  },
  { timestamps: true }
);

export default mongoose.model<IPeekySettings>("PeekySettings", PeekySettingsSchema);
