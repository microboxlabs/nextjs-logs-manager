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
      // Redirigir a la página de login
    } else {
      console.log("Error during logout");
    }
  };

  return (
    <Dropdown hidden={isLoggedIn ? false : true} label={user}>
      <button
        id="dropdownNavbarLink"
        data-dropdown-toggle="dropdownNavbar"
        className="flex w-full items-center justify-between rounded px-3 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent"
      ></button>
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
          href="/"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Sign out
        </a>
      </Dropdown.Item>
    </Dropdown>
  );
};
export default DropDownNavBarLink;
