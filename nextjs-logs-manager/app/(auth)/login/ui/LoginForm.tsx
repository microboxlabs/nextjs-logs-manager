'use client';

import { login } from "@/actions";
import { loginSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null);

    startTransition(async () => {
      const response = await login(values);
      if (!response!.ok) {
        setError(response!.message)
        return;
      };
      router.push("/dashboard");
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col rounded border border-gray-100 p-10">
        <h1 className="mb-5 text-xl font-bold">Login</h1>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              className="rounded border border-gray-200"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="my-5 flex flex-col space-y-2">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="rounded border border-gray-200"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          {error && <span className="text-red-500">{error}</span>}
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
