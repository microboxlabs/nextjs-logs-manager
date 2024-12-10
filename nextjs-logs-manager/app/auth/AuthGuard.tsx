"use client";

import { useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { isAuth, isAdmin, loadStoredAuth } = useAuth();

  const [itRedirects, newPath] = useMemo(() => {
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

    return [redirect, pathToRedirect];
  }, [isAuth, isAdmin, pathname]);

  useEffect(() => {
    loadStoredAuth();
  }, [loadStoredAuth]);

  useEffect(() => {
    if (itRedirects) {
      replace(newPath);
    }
  }, [itRedirects, newPath, replace]);

  return !itRedirects ? children : null;
}
