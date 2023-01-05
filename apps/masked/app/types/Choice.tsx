import { z } from "zod";
import { pollSchema } from "./Poll";

const choiceBase = {
  id: z.string().optional(),
  description: z.string(),
  votes: z.number(),
  percentage: z.number(),
  created_at: z.date(),
};

export const choiceSchema = z.object({
  ...choiceBase,
  poll: z.string(),
});

export const choiceWithPollSchema = z.object({
  ...choiceBase,
  poll: pollSchema,
});

export type Choice = z.infer<typeof choiceSchema>;
export type ChoiceWithPoll = z.infer<typeof choiceWithPollSchema>;
