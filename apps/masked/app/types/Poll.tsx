import { z } from "zod";
import { roomSchema } from "./Room";

const pollBase = {
  id: z.string().optional(),
  question: z.string(),
  created_at: z.date(),
};

export const pollSchema = z.object({
  ...pollBase,
  room: z.string(),
});

export const pollWithRoomSchema = z.object({
  ...pollBase,
  room: roomSchema,
});

export type Poll = z.infer<typeof pollSchema>;
export type PollWithRoom = z.infer<typeof pollWithRoomSchema>;
