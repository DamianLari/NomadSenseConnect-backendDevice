import { z } from "zod";

export const peekySettingsSchema = z.object({
  id: z.string(), // identifiant du device
  stream: z.boolean().optional(),
  interval: z.number().min(500).max(60000).optional(),     // fréquence en ms
  quality: z.number().min(10).max(63).optional(),          // qualité JPEG
  width: z.number().min(1).max(1920).optional(),           // largeur image
  height: z.number().min(1).max(1080).optional(),          // hauteur image
});

export type PeekySettings = z.infer<typeof peekySettingsSchema>;

export const createPeekySettingsSchema = peekySettingsSchema
  .omit({ id: true }) // ID généré automatiquement ou transmis dans l'URL
  .strict();
export type CreatePeekySettings = z.infer<typeof createPeekySettingsSchema>;

export const updatePeekySettingsSchema = createPeekySettingsSchema.strict();
export type UpdatePeekySettings = z.infer<typeof updatePeekySettingsSchema>;

export const deletePeekySettingsSchema = z.object({
  id: z.string(),
});
export type DeletePeekySettings = z.infer<typeof deletePeekySettingsSchema>;
