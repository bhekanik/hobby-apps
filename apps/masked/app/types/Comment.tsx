import { z } from "zod";
import { confessionSchema } from "./Confession";

const commentBase = {
  id: z.string().optional(),
  content: z.string(),
  poster: z.string(),
  created_at: z.date(),
};

export const commentSchema = z.object({
  ...commentBase,
  comment_on: z.string().optional(),
  post: z.string(),
});

export const commentWithCommentSchema = z.object({
  ...commentBase,
  post: z.string(),
  comment_on: commentSchema,
});

export const commentWithPostSchema = z.object({
  ...commentBase,
  comment_on: z.string().optional(),
  post: confessionSchema,
});

export const commentWithLinksSchema = z.object({
  ...commentBase,
  comment_on: commentSchema,
  post: confessionSchema,
});

export type Comment = z.infer<typeof commentSchema>;
export type CommentWithComment = z.infer<typeof commentWithCommentSchema>;
export type CommentWithPost = z.infer<typeof commentWithPostSchema>;
export type CommentWithLinks = z.infer<typeof commentWithLinksSchema>;
