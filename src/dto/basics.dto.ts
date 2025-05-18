import { z } from "zod";

export const emptyBodySchema = z.object({}).strict("No body allowed");
export type EmptyBody = z.infer<typeof emptyBodySchema>;
