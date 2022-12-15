import { z } from "zod";
import { roomSchema } from "./Room";

const postBase = {
  id: z.string().optional(),
  title: z.string(),
  likes: z.number(),
  views: z.number(),
  content: z.string(),
  created_at: z.date(),
};

export const postSchema = z.object({
  ...postBase,
  room: z.string(),
});

export const postWithRoomSchema = z.object({
  ...postBase,
  room: roomSchema,
});

export type Post = z.infer<typeof postSchema>;
export type PostWithRoom = z.infer<typeof postWithRoomSchema>;
