import mongoose, { Document, Schema } from "mongoose";

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IDevice extends Document {
  id: string;              // identifiant (souvent MQTT)
  name: string;            // nom lisible
  role: string;            // ex: "surveillance", "relay"
  modules: string[];       // ["peeky", "heary", ...]
  status: "active" | "inactive" | "error";
 // données techniques additionnelles
}

const DeviceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    modules: { type: [String], required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "error"],
      default: "inactive",
    },
    
  },
  { timestamps: true }
);

export default mongoose.model<IDevice>("Device", DeviceSchema);
