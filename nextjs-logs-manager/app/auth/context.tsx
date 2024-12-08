"use client";

import { createContext, useState } from "react";

export const AuthContext = createContext({
  name: "",
  email: "",
  isAuth: false,
  isAdmin: false,
  token: "",
  signIn: () => {},
  signOut: () => {},
  loadStoredAuth: () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState({ name: "", email: "" });
  const [auth, setAuth] = useState({
    isAuth: false,
    isAdmin: false,
    token: "",
  });

  const signIn = () => {
    const userData = { name: "", email: "" };
    const authData = { isAuth: true, isAdmin: true, token: "" };

    setUser(userData);
    setAuth(authData);

    localStorage.setItem("lm-user", JSON.stringify(userData));
    localStorage.setItem("lm-auth", JSON.stringify(authData));
  };

  const signOut = () => {
    setUser({ name: "", email: "" });
    setAuth({ isAuth: false, isAdmin: true, token: "" });
    localStorage.clear();
  };

  const loadStoredAuth = () => {
    const existingUserData = localStorage.getItem("lm-user");
    if (existingUserData) {
      const user = JSON.parse(existingUserData);
      setUser(user);
    }

    const existingAuthData = localStorage.getItem("lm-auth");
    if (existingAuthData) {
      const auth = JSON.parse(existingAuthData);
      setAuth(auth);
    }
  };

  const ctxValue = {
    ...user,
    ...auth,
    signIn,
    signOut,
    loadStoredAuth,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}
