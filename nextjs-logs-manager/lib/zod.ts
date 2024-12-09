import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(4).email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  name: z.string().min(6),
  email: z.string().min(4).email(),
  password: z.string().min(6),
});
