"use client";
import Navbar from "@/components/Navbar";
import { DarkThemeToggle, Button } from "flowbite-react";
import Link from "next/link";
import { FC } from "react";

const Home: FC = () => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="mb-4 text-4xl font-bold dark:text-white">
              MicroboxLabs Logs Viewer
            </h1>
            <Button gradientDuoTone="purpleToBlue">
              <Link href="/auth/signin">Log In</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
