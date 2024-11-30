import { DarkThemeToggle } from "flowbite-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

// this is the home, here i will display data based on the state of the user
export default function Home() {
  // check if the user has logged in, if not then send him to the login page:
  /* 
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("user_data");

      if (!user_data) {
        router.push("/login");
      }
    }
  });
  */

  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      <h1 className="text-2xl dark:text-white">Flowbite React + Next.js</h1>
      <DarkThemeToggle />
    </main>
  );
}
