import { z } from "zod";

export const hearySettingsSchema = z.object({
  gain: z.number().min(1).max(100).optional(),        // amplification du signal
  threshold: z.number().min(0).max(1024).optional(),  // déclenchement de détection
  fftSize: z.enum(["256", "512", "1024"]).optional(), // taille du buffer FFT
  stream: z.boolean().optional(),                     // stream auto ou à la demande
  interval: z.number().min(500).max(10000).optional(),// fréquence de publication
});

export type HearySettings = z.infer<typeof hearySettingsSchema>;
