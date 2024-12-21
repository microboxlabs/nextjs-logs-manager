"use client";

import { FormEvent, useRef } from "react";
import { Label } from "@/src/components/ui/label";
import MailIcon from "@/src/components/auth/icons/MailIcon";
import { Input } from "@/src/components/ui/input";
import PasswordIcon from "@/src/components/auth/icons/PasswordIcon";
import { Button } from "@/src/components/ui/button";
import nextConfig from "@/next.config.mjs";
import { useToast } from "@/src/hooks/use-toast";
import { UserIcon } from "lucide-react";

export default function SignInForm() {
  const fullNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${nextConfig.env.API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: fullNameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
          }),
        },
      );
      if (!response.ok) {
        const { error = "Try again later" } = await response.json();
        toast({
          variant: "destructive",
          title: "Couldn't sign you up",
          description: error,
        });
        return;
      }
      if (fullNameRef.current) {
        fullNameRef.current.value = "";
      }
      if (emailRef.current) {
        emailRef.current.value = "";
      }
      if (passwordRef.current) {
        passwordRef.current.value = "";
      }

      toast({
        variant: "default",
        title: "Registered successfully",
        description: "You can now log in",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Couldn't sign you up",
        description: `${error}`,
      });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col items-center gap-[clamp(8px,2vh,8rem)]"
    >
      <div className="flex w-full flex-col place-content-center gap-1.5">
        <Label
          htmlFor="fullName"
          className="flex w-full flex-row items-center gap-2 sm:w-[400px]"
        >
          <UserIcon />
          Full Name
        </Label>
        <Input
          type="text"
          id="fullName"
          placeholder="What should we call you?"
          className="w-full sm:w-[400px]"
          ref={fullNameRef}
        />
      </div>
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
