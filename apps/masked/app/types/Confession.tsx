import { z } from "zod";
import { roomSchema } from "./Room";

const confessionsBase = {
  id: z.string().optional(),
  title: z.string(),
  likes: z.number(),
  views: z.number(),
  content: z.string(),
  created_at: z.date(),
};

export const confessionSchema = z.object({
  ...confessionsBase,
  room: z.string(),
});

export const confessionWithRoomSchema = z.object({
  ...confessionsBase,
  room: roomSchema,
});

export type Confession = z.infer<typeof confessionSchema>;
export type ConfessionWithRoom = z.infer<typeof confessionWithRoomSchema>;
