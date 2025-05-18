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
  lastSeen?: Date;
  location?: ILocation;
  metadata?: Record<string, any>; // données techniques additionnelles
}

const LocationSchema: Schema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const DeviceSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    modules: { type: [String], required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "error"],
      default: "inactive",
    },
    lastSeen: { type: Date },
    location: { type: LocationSchema, required: false },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model<IDevice>("Device", DeviceSchema);
