import z from "zod";

export const signInWithCredentialsSchema = z.object({
	username: z.string().email(),
	password: z.string().min(8),
});

export type SignInWithCredentialsInput = z.TypeOf<
	typeof signInWithCredentialsSchema
>;
