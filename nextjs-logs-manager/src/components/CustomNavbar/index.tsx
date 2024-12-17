"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Navbar, DarkThemeToggle } from "flowbite-react";
import AvatarMenu from "../AvatarMenu";

export default function CustomNavbar() {
    const { data: session, status } = useSession();
    const isAdmin = session?.user?.role === "ADMIN";

    return (
        <Navbar
            fluid
            rounded
            className="bg-gray-100 shadow-md dark:bg-gray-800 dark:text-white"
        >
            {/* LOGO */}
            <Navbar.Brand
                as={Link}
                href={status === "authenticated" ? "/dashboard" : "/auth/login"}
            >
                <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">
                    Log Manager
                </span>
            </Navbar.Brand>

            {/* Collapse: Menú de navegación principal */}
            <Navbar.Collapse className="ml-auto">
                {status === "authenticated" && (
                    <>
                        <Navbar.Link
                            as={Link}
                            href="/dashboard/logs-view"
                            className="hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            Logs View
                        </Navbar.Link>
                        {isAdmin && (
                            <Navbar.Link
                                as={Link}
                                href="/dashboard/logs-view/admin-create"
                                className="hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                Create New Log
                            </Navbar.Link>
                        )}
                        {isAdmin && (
                            <Navbar.Link
                                as={Link}
                                href="/dashboard/admin-view-users"
                                className="hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                Users
                            </Navbar.Link>
                        )}
                    </>
                )}
            </Navbar.Collapse>

            {/* Right-Side Icons */}
            <div className="flex items-end gap-4 pl-10 ml-auto">
                {/* Dark Mode Toggle */}
                <DarkThemeToggle />

                {/* Avatar Menu */}
                {status === "authenticated" && (
                    <AvatarMenu
                        userEmail={session.user?.email || "user@example.com"}
                        userRole={session.user?.role || "USER"}
                    />
                )}

                {/* Toggle for small screens */}
                <Navbar.Toggle className="ml-auto lg:hidden" />
            </div>
        </Navbar>
    );
}
