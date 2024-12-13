"use client";

import Link from "next/link";
import { Navbar as FlowbiteNavbar, DarkThemeToggle, Button } from "flowbite-react";
import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <FlowbiteNavbar
            fluid
            rounded
            className="fixed inset-x-0 top-0 z-50 bg-white shadow-md dark:bg-gray-800"
        >
            <FlowbiteNavbar.Brand as={Link} href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Next Js - Log Manager
                </span>
            </FlowbiteNavbar.Brand>
            <div className="flex items-center gap-4">
                <DarkThemeToggle />
                {isLoggedIn && (
                    <Button onClick={handleLogout} color="failure" size="sm">
                        Logout
                    </Button>
                )}
            </div>
        </FlowbiteNavbar>
    );
}
