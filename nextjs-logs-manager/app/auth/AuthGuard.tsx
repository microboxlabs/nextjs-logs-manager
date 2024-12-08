"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { isAuth, isAdmin, loadStoredAuth } = useAuth();

  let redirect = false;
  let pathToRedirect = "/";

  if (!isAuth && pathname !== "/sign-in") {
    redirect = true;
    pathToRedirect = "/sign-in";
  }

  if (isAuth && pathname === "/sign-in") {
    redirect = true;
    pathToRedirect = "/";
  }

  if (isAuth && !isAdmin && pathname !== "/") {
    redirect = true;
  }

  useEffect(() => {
    loadStoredAuth();
  }, []);

  useEffect(() => {
    if (redirect) {
      replace(pathToRedirect);
    }
  }, [pathname, isAuth]);

  return !redirect ? children : null;
}
