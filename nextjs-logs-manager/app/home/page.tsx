"use client";
import Navbar from "@/components/Navbar";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Landing = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(localStorage.getItem("user") || "");
    }
  }, []);
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="mb-4 text-4xl font-bold dark:text-white">
              MicroboxLabs Logs Viewer
            </h1>
            {username && (
              <h2 className="mb-4 text-4xl font-bold dark:text-white">
                Welcome, {username}
              </h2>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Landing;
