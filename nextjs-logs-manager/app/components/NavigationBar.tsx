"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { Navbar, Button } from "flowbite-react";

export default function NavigationBar() {
  const { isAuth, isAdmin, signOut } = useAuth();
  const pathname = usePathname();

  return (
    <Navbar
      rounded
      className="mb-8 flex h-[70px] items-center shadow-sm sm:px-0"
    >
      <Navbar.Brand className="text-xl font-bold">Logs manager</Navbar.Brand>
      <div className="flex md:order-2">
        {isAuth && (
          <>
            <Button
              onClick={() => signOut()}
              pill
              color="dark"
              className="mr-2 md:mr-0"
            >
              Sign out
            </Button>
            {isAdmin && <Navbar.Toggle />}
          </>
        )}
      </div>
      {isAuth && isAdmin && (
        <Navbar.Collapse>
          <Navbar.Link as={Link} href="/" active={pathname === "/"}>
            Logs
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            href="/entries"
            active={pathname === "/entries"}
          >
            Entries
          </Navbar.Link>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}
