'use client'
import { DarkThemeToggle } from "flowbite-react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import Login from "./components/login/login-form";

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      <Login />
    </main>
  );
}
