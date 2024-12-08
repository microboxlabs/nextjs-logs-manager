"use client";

import { createContext, useState } from "react";

export const AuthContext = createContext({
  name: "",
  email: "",
  isAuth: false,
  isAdmin: false,
  signIn: () => {},
  signOut: () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState({ name: "", email: "" });
  const [auth, setAuth] = useState({ isAuth: false, isAdmin: false });

  const signIn = () => {};
  const signOut = () => {};

  const ctxValue = { ...user, ...auth, signIn, signOut };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}
