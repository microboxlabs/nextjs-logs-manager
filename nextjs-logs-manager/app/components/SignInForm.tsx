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
      alert("Bad credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="mx-auto max-w-lg">
      <Alert className="mb-6">
        <span className="font-medium">Usuarios:</span>
        <ul className="mt-1.5 list-inside list-disc">
          <li>admin@test.com / admin123</li>
          <li>user@test.com / user123</li>
        </ul>
      </Alert>

      <div className="mb-6">
        <Label htmlFor="email">Email</Label>
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email required" }}
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
        <Label htmlFor="password">Password</Label>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password required" }}
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
          Remember me
        </Label>
      </div>

      <div className="mt-6 flex justify-center md:justify-end">
        <Button type="submit" pill>
          Sign in
        </Button>
      </div>
    </form>
  );
}
