import { z } from "zod";

export const devicePresetSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  modules: z.array(z.string()),
  defaultSettings: z.record(z.any()).optional(), // exemple: { peeky: { quality: 30 }, relay: {} }
});

export type DevicePreset = z.infer<typeof devicePresetSchema>;

export const createDevicePresetSchema = devicePresetSchema.omit({ id: true }).strict();
export type CreateDevicePreset = z.infer<typeof createDevicePresetSchema>;

export const updateDevicePresetSchema = createDevicePresetSchema.partial().strict();
export type UpdateDevicePreset = z.infer<typeof updateDevicePresetSchema>;

export const deleteDevicePresetSchema = z.object({ id: z.string() });
export type DeleteDevicePreset = z.infer<typeof deleteDevicePresetSchema>;
