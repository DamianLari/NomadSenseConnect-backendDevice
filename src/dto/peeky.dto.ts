import { z } from "zod";

export const peekySettingsSchema = z.object({
  stream: z.boolean().optional(),
  interval: z.number().min(500).max(60000).optional(), // en ms
  quality: z.number().min(10).max(63).optional(), // qualité JPEG (caméra)
});

export type PeekySettings = z.infer<typeof peekySettingsSchema>;
