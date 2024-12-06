"use client";
import { DarkThemeToggle } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DropDownNavBarLink from "./DropdownNavBarLink";

const Navbar = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const valid = localStorage.getItem("valid") === "true";
      console.log("Token:", token, "Valid:", valid); // Debug
      setIsLoggedIn(!!token);
      setIsValid(valid);
    }
  }, []);
  return (
    <div>
      <nav className="border-gray-200 bg-gray-200 dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <a
            href="https://www.microboxlabs.com/"
            className="flex items-center rtl:space-x-reverse"
          >
            <Image
              src="https://developer.microboxlabs.com/assets/svg/logo/logotipo-negro.svg"
              alt="Flowbite Logo"
              width={120}
              height={30}
              className="dark:hidden" // Esta imagen se oculta en modo oscuro
            />

            <Image
              src="https://developer.microboxlabs.com/assets/svg/logo/logotipo-blanco.svg"
              alt="Flowbite Logo"
              width={120}
              height={30}
              className="hidden dark:block" // Esta imagen solo se muestra en modo oscuro
            />
            <span className="self-center whitespace-nowrap font-semibold dark:text-white">
              Logs System
            </span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <DarkThemeToggle />

            {isLoggedIn ? (
              <DropDownNavBarLink />
            ) : (
              <a
                href="/auth/signin"
                className={` text-sm text-blue-600 hover:underline dark:text-blue-500`}
              >
                Login
              </a>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="mx-auto max-w-screen-xl px-4 py-3">
          <div className="flex items-center">
            <ul className="mt-0 flex flex-row space-x-8 text-sm font-medium rtl:space-x-reverse">
              <li>
                <a
                  href={isLoggedIn ? "/home" : "/"}
                  className="text-gray-900 hover:underline dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>

              {isLoggedIn && (
                <li>
                  <Link
                    href="/dashboard"
                    className="text-gray-900 hover:underline dark:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
              )}

              {isLoggedIn && isValid && (
                <li>
                  <Link
                    href="/upload"
                    className="text-gray-900 hover:underline dark:text-white"
                  >
                    Upload Logs
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
