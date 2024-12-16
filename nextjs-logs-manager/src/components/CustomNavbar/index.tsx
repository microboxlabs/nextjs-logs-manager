"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button, Navbar, DarkThemeToggle } from "flowbite-react";

export default function CustomNavbar() {
    const { data: session, status } = useSession();

    const handleLogout = async () => {
        await signOut({
            callbackUrl: "/login",
            redirect: true,
        });
    };

    return (
        <Navbar
            fluid
            rounded
            className="bg-gray-100 shadow-md dark:bg-gray-800 dark:text-white"
        >
            <Navbar.Brand as={Link} href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">
                    Log Manager
                </span>
            </Navbar.Brand>

            <div className="ml-auto flex items-center gap-2 md:order-2">
                {/* Contenido Desktop (≥ md) */}
                <div className="hidden items-center gap-2 md:flex">
                    {status === "authenticated" && (
                        <>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                {session.user?.email} ({session.user?.role})
                            </span>
                            <DarkThemeToggle />
                            <Button
                                onClick={handleLogout}
                                color="failure"
                                size="sm"
                                className="text-white dark:text-gray-800"
                            >
                                Logout
                            </Button>
                        </>
                    )}

                    {status === "unauthenticated" && (
                        <>
                            <DarkThemeToggle />
                            <Link href="/login">
                                <Button color="success" size="sm">
                                    Login
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Toggle + DarkTheme solo para Mobile (< md) */}
                <div className="flex items-center gap-2 md:hidden">
                    <DarkThemeToggle />
                    <Navbar.Toggle />
                </div>
            </div>

            <Navbar.Collapse>
                {/* Contenido Mobile (< md) */}
                <div className="block md:hidden">
                    {status === "authenticated" && (
                        <>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                {session.user?.email} ({session.user?.role})
                            </span>
                            <Button
                                onClick={handleLogout}
                                color="failure"
                                size="sm"
                                className="w-full text-white dark:text-gray-800"
                            >
                                Logout
                            </Button>
                        </>
                    )}

                    {status === "unauthenticated" && (
                        <Link href="/login">
                            <Button color="success" size="sm" className="w-full">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}