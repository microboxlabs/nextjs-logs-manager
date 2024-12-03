"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/lib/zod";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    return {
      ok: true,
      message: "Sesión iniciada correctamente",
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo iniciar sesión",
    };
  }
};
