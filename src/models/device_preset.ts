import mongoose, { Document, Schema } from "mongoose";

export interface IDevicePreset extends Document {
  name: string;
  role: string;
  modules: string[];
  defaultSettings?: Record<string, any>; // peut contenir des configs pour peeky, relay, etc.
}

const DevicePresetSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    modules: { type: [String], required: true },
    defaultSettings: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model<IDevicePreset>("DevicePreset", DevicePresetSchema);
