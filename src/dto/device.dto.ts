import { z } from "zod";

export const iotSchema = z.object({
  id: z.string(),
  name: z.string(), // optionnel si tu veux une UI + friendly
  role: z.string(), // ex: 'surveillance', 'relai', etc.
  modules: z.array(z.string()), // ex: ['peeky', 'heary']
  status: z.enum(["active", "inactive", "error"]).default("active"),
});

export type Iot = z.infer<typeof iotSchema>;

export const iotListSchema = iotSchema.array();
export type IotList = z.infer<typeof iotListSchema>;

export const createIotSchema = iotSchema.strict();
export type CreateIot = z.infer<typeof createIotSchema>;

export const updateIotSchema = createIotSchema.partial().strict();
export type UpdateIot = z.infer<typeof updateIotSchema>;

export const deleteIotSchema = z.object({
  id: z.string(),
});
export type DeleteIot = z.infer<typeof deleteIotSchema>;