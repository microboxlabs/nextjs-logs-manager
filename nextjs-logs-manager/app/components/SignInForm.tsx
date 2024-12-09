"use client";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { TextInput, Alert, Button, Checkbox, Label } from "flowbite-react";

import type { TSignInForm, TLoginResponse } from "@/app/shared/types";
import { useAuth } from "../hooks/useAuth";
import ErrorMessage from "./ErrorMessage";

export default function SignInForm() {
  const {
    handleSubmit,
    control,
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
      <Alert className="mb-6">
        <span className="font-medium">Usuarios:</span>
        <ul className="mt-1.5 list-inside list-disc">
          <li>admin@prueba.com / admin123</li>
          <li>user@prueba.com / usuario123</li>
        </ul>
      </Alert>

      <div className="mb-6">
        <Label htmlFor="email">Correo electr&oacute;nico</Label>
        <Controller
          control={control}
          name="email"
          rules={{ required: "Correo electrónico requerido" }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              id="email"
              value={value}
              onChange={onChange}
              type="email"
              placeholder="john.doe@domain.com"
            />
          )}
        />

        {errors && errors.email && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
      </div>
      <div className="mb-6">
        <Label htmlFor="password">Contrase&ntilde;a</Label>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Contraseña requerida" }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              id="password"
              value={value}
              onChange={onChange}
              type="password"
              placeholder="•••••••••"
            />
          )}
        />

        {errors && errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="flex">
          Recordar cuenta
        </Label>
      </div>

      <div className="flex justify-center md:justify-end">
        <Button type="submit" pill>
          Iniciar sesi&oacute;n
        </Button>
      </div>
    </form>
  );
}
