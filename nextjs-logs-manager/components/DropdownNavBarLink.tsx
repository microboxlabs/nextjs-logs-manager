"use client";
import { Dropdown } from "flowbite-react";
import router from "next/router";
import { useEffect, useState } from "react";

const DropDownNavBarLink = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setUser(localStorage.getItem("user") || "?");
    }
  }, []);
  const handleLogout = async () => {
    // Realizar la solicitud al API de logout
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (res.ok) {
      // Redirigir a la página de login después de hacer logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("valid");
    } else {
      // Show error message to user
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <Dropdown hidden={isLoggedIn ? false : true} label={user}>
      <Dropdown.Item>
        <a
          href="#"
          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Settings
        </a>
      </Dropdown.Item>
      <Dropdown.Item className="" onClick={handleLogout}>
        <a
          href="/auth/signin"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Sign out
        </a>
      </Dropdown.Item>
    </Dropdown>
  );
};
export default DropDownNavBarLink;
