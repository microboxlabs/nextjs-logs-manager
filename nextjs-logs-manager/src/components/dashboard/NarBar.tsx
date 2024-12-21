"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useToast } from "@/src/hooks/use-toast";
import nextConfig from "@/next.config.mjs";
import { useCallback, useState } from "react";

export default function NarBar({ fullName }: { fullName: string }) {
  const [loggedOut, setLoggedOut] = useState(false);
  const { toast } = useToast();

  const logout = useCallback(async () => {
    await fetch(`${nextConfig.env.API_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          // Eliminar la cookie de autenticación
          document.cookie =
            "auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
          setLoggedOut(true); // Cambiar el estado a loggedOut
          toast({
            title: "You have been logged out",
            description: "Goodbye! 👋",
          });

          // Recargar la página para resetear el estado y eliminar datos de sesión previos
          window.location.reload();
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Couldn't log you out",
          description: "Please try again later.",
        });
      });
  }, [toast]);

  return (
    <nav
      className={`flex w-full flex-row items-center justify-between gap-[clamp(4rem,2vh,12rem)] rounded-2xl  bg-white px-[clamp(10px,2.5vh,5rem)] py-[clamp(8px,2vh,4rem)] font-medium dark:bg-slate-900`}
    >
      <div className="flex flex-row gap-[clamp(0.5rem,0.25vw,1.5rem)]">
        <Image
          src={"/assets/icons/space.svg"}
          width={24}
          height={24}
          alt="logo"
        />
        <span className={`text-[clamp(1rem,1vh,1rem)]`}>{fullName}</span>
      </div>
      <Button onClick={logout}>Logout</Button>
    </nav>
  );
}
