"use client";

import Link from "next/link";
import { Button, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";

export function CustomNavbar() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          LogsManager
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <div>
          <Dropdown arrowIcon={true} label={<h1>Logs</h1>} color="gray">
            <Dropdown.Header>
              <span className="block text-sm">Opciones</span>
            </Dropdown.Header>
            <Dropdown.Item>Subir logs</Dropdown.Item>
            <Dropdown.Item>Ver logs</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Link href="/login">
          <Button >Iniciar sesión</Button>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
