"use client";

import { useState } from "react";
import { Navbar, Button } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface NavbarClientProps {
  name: string;
  role: string;
}

export function NavbarClient({ role, name }: NavbarClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = usePathname();

  const isActive = (path: string) => currentPath === path;

  if (currentPath === "/") {
    return null;
  }

  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/dashboard">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Log Management
        </span>
      </Navbar.Brand>
      <div className="flex items-center md:order-2">
        {
          <>
            <span className="mr-4 hidden md:block">Welcome, {name}</span>
            <Button onClick={() => signOut({ callbackUrl: "/" })}>
              Log out
            </Button>
          </>
        }
        <Navbar.Toggle onClick={() => setIsMenuOpen(!isMenuOpen)} />
      </div>
      <Navbar.Collapse className={isMenuOpen ? "block" : "hidden md:block"}>
        <Navbar.Link
          as={Link}
          href="/dashboard"
          active={isActive("/dashboard")}
        >
          Dashboard
        </Navbar.Link>
        {role === "admin" && (
          <Navbar.Link as={Link} href="/upload" active={isActive("/upload")}>
            Upload Logs
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
