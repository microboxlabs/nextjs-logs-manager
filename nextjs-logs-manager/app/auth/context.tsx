"use client";

import { createContext, useState } from "react";
import { Role, TLoginResponse } from "../shared/types";

export const AuthContext = createContext({
  username: "",
  email: "",
  isAuth: false,
  isAdmin: false,
  token: "",
  signIn: (data: TLoginResponse) => {},
  signOut: () => {},
  loadStoredAuth: () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState({ username: "", email: "" });
  const [auth, setAuth] = useState({
    isAuth: false,
    isAdmin: false,
    token: "",
  });

  const signIn = (data: TLoginResponse) => {
    const userData = {
      username: data.account.username,
      email: data.account.email,
    };
    const authData = {
      isAuth: true,
      isAdmin: data.account.roleId === Role.Admin,
      token: data.token,
    };

    setUser(userData);
    setAuth(authData);

    localStorage.setItem("lm-user", JSON.stringify(userData));
    localStorage.setItem("lm-auth", JSON.stringify(authData));
  };

  const signOut = () => {
    setUser({ username: "", email: "" });
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
