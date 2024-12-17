"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Navbar, DarkThemeToggle } from "flowbite-react";
import AvatarMenu from "../AvatarMenu";

export default function CustomNavbar() {
    const { data: session, status } = useSession();

    const isAdmin = session?.user?.role === "ADMIN";

    return (
        <Navbar fluid rounded className="bg-gray-100 shadow-md dark:bg-gray-800 dark:text-white">
            {/* LOGO */}
            <Navbar.Brand as={Link} href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">
                    Log Manager
                </span>
            </Navbar.Brand>

            {/* Contenido a la derecha */}
            <div className="flex items-center gap-4">
                {/* Navegación Principal */}
                {status === "authenticated" && (
                    <div className="mx-auto flex gap-4 text-sm font-medium">
                        <Link
                            href="/dashboard/logs-view"
                            className="hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            Logs View
                        </Link>

                        {isAdmin && (
                            <Link
                                href="/dashboard/logs-view/new-log"
                                className="hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                Create New Log
                            </Link>
                        )}

                        {isAdmin && (
                            <Link
                                href="/dashboard/users"
                                className="hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                Users
                            </Link>
                        )}
                    </div>
                )}
                {/* Dark Mode Toggle */}
                <DarkThemeToggle />

                {/* Avatar Menu */}
                {status === "authenticated" && (
                    <AvatarMenu
                        userEmail={session.user?.email || "user@example.com"}
                        userRole={session.user?.role || "USER"}
                    />
                )}
            </div>
        </Navbar>
    );
}
