"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: any }) {
  return <SessionProvider>{children}</SessionProvider>;
}
