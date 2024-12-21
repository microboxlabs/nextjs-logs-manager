"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { Label } from "@/src/components/ui/label";
import MailIcon from "@/src/components/auth/icons/MailIcon";
import { Input } from "@/src/components/ui/input";
import PasswordIcon from "@/src/components/auth/icons/PasswordIcon";
import { Button } from "@/src/components/ui/button";
import nextConfig from "@/next.config.mjs";
import FormStatus from "@/src/components/auth/forms/FormStatus";
import { redirect } from "next/navigation";
import { useToast } from "@/src/hooks/use-toast";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });
  const { toast } = useToast();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sessionStorage.removeItem("userSession");
    setStatus(() => ({ type: "loading" }));
    try {
      const response = await fetch(`${nextConfig.env.API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        }),
        credentials: "include",
      });
      if (!response.ok) {
        const { error = "Try again later" } = await response.json();
        toast({
          variant: "destructive",
          title: "Couldn't log you in",
          description: error,
        });
        return;
      }
      setStatus(() => ({ type: "success" }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Couldn't log you in",
        description: error as string,
      });
    }
  };

  if (status.type === "success") {
    return redirect("/");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col items-center gap-[clamp(8px,2vh,8rem)]"
    >
      <div className="flex w-full flex-col place-content-center gap-1.5">
        <Label
          htmlFor="email"
          className="flex w-full flex-row items-center gap-2 sm:w-[400px]"
        >
          <MailIcon />
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Hmm, that email doesn’t look valid."
          ref={emailRef}
        />
      </div>
      <div className="flex w-full flex-col place-content-center gap-1.5">
        <Label
          htmlFor="password"
          className="flex w-full flex-row items-center gap-2 sm:w-[400px]"
        >
          <PasswordIcon />
          Password
        </Label>
        <Input
          type="password"
          id="password"
          placeholder="Shh... It's a secret."
          ref={passwordRef}
        />
      </div>
      <Button type="submit">Continue</Button>
    </form>
  );
}
