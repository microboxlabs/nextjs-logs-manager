"use client";

import { useForm } from "react-hook-form";

import type { TSignInForm } from "@/app/shared/types";
import Button from "./Button";
import { useAuth } from "../hooks/useAuth";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInForm>({
    defaultValues: { email: "", password: "", remember: false },
  });
  const { signIn } = useAuth();

  const submit = (data: TSignInForm) => {
    signIn();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="mx-auto max-w-xl">
      <div className="mb-6">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Correo electr&oacute;nico
        </label>
        <input
          type="email"
          id="email"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="john.doe@domain.com"
          {...register("email", { required: "Correo electrónico requerido" })}
        />
        {errors && errors.email && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Contrase&ntilde;a
        </label>
        <input
          type="password"
          id="password"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="•••••••••"
          {...register("password", { required: "Contraseña requerida" })}
        />
        {errors && errors.password && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="mb-6 flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            {...register("remember")}
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Recordar cuenta
        </label>
      </div>
      <div className="flex justify-center md:justify-end">
        <Button type="submit" className="w-full bg-blue-700 md:w-auto">
          Iniciar sesi&oacute;n
        </Button>
      </div>
    </form>
  );
}
