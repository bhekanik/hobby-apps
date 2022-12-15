import { z } from "zod";

export const userSchema = z.object({
  id: z.string().optional(),
  username: z.string(),
  password: z
    .string()
    .min(8, { message: "Password must be 8 or more characters long" }),
  firstname: z.string(),
  lastname: z.string(),
  gender: z.enum(["male", "female"]),
  whatsapp_username: z.string(),
  created_at: z.date(),
});

export type User = z.infer<typeof userSchema>;
