"use client";

import { signIn, signOut } from "next-auth/react";

export async function login(credentials: { username: string; password: string }) {
  try {
    const result = await signIn("credentials", {
      username: credentials.username,
      password: credentials.password,
      redirect: false, // Evita redireccion
    });

    if (!result?.ok) {
      throw new Error("Authentication failed");
    }

    return result;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function logOut() {
  try {
    await signOut({ redirect: false }); 
  } catch (error) {
    console.error("Logout error:", error);
  }
}