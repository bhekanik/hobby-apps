import { z } from "zod";

export const roomSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  secret: z.string().optional(),
  type: z.enum(["default", "ama"]),
  created_at: z.date(),
});

export type Room = z.infer<typeof roomSchema>;
