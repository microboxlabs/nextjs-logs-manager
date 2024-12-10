import { z } from "zod";

export const signInWithCredentialsSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(7),
});

export type SignInWithCredentialsInput = z.TypeOf<
  typeof signInWithCredentialsSchema
>;
