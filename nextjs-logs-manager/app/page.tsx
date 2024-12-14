'use client'
import { DarkThemeToggle } from "flowbite-react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import Login from "./component/login/login-form";

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      {/* <h1 className="text-2xl dark:text-white">Get Started!!</h1>
      <Button onClick={() => router.push('/login')}>GO!</Button> */}
      <Login />
      <DarkThemeToggle />
    </main>
  );
}
