"use client";

import { useForm } from "react-hook-form";
import axios from "axios";

import type { TSignInForm, TLoginResponse } from "@/app/shared/types";
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

  const submit = async (data: TSignInForm) => {
    try {
      const res = await axios.post<TLoginResponse>("/api/auth", data);
      signIn(res.data);
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="mx-auto max-w-xl">
      <div
        className="mb-4 flex rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <svg
          className="me-3 mt-[2px] inline h-4 w-4 flex-shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Usuarios:</span>
          <ul className="mt-1.5 list-inside list-disc">
            <li>admin@prueba.com / admin123</li>
            <li>user@prueba.com / usuario123</li>
          </ul>
        </div>
      </div>
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
