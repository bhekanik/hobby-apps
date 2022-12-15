import { z } from "zod";
import { userSchema } from "./User";

const likeBase = {
  id: z.string().optional(),
  created_at: z.date(),
};

export const likeSchema = z.object({
  ...likeBase,
  from: z.string(),
  to: z.string(),
});

export const likeWithUsersSchema = z.object({
  ...likeBase,
  from: userSchema,
  to: userSchema,
});

export type Like = z.infer<typeof likeSchema>;
export type LikeWithUsers = z.infer<typeof likeWithUsersSchema>;
