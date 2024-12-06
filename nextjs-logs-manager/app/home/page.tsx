"use client";
import Navbar from "@/components/Navbar";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Landing = () => {
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          // Validate username format
          const sanitizedUsername = storedUser.replace(/[<>]/g, "");
          setUsername(sanitizedUsername);
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
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
                Welcome, <span>{username.replace(/[<>]/g, "")}</span>
              </h2>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Landing;
