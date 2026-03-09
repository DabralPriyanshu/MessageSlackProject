import { z } from "zod";

export const userSignUpSchema = z.object({
  email: z.email(),
  username: z.string().min(3).max(50),
  password: z.string().min(3),
});

export const userSignInSchema = z.object({
  email: z.email(),
  password: z.string().min(3),
});
