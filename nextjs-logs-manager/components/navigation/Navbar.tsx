'use client'

import { Navbar, DarkThemeToggle, Button, Avatar, Dropdown } from 'flowbite-react'
import { useSession, signOut } from 'next-auth/react'
import { HiOutlineDocumentAdd, HiOutlineViewList, HiOutlineLogout } from 'react-icons/hi'
import Link from 'next/link'

export function MainNavbar() {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN'

  return (
    <Navbar fluid className="border-b">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Logs Manager
        </span>
      </Navbar.Brand>

      <div className="flex items-center gap-4 md:order-2">
        <DarkThemeToggle />
        
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar rounded>
              <div className="rounded-full bg-gray-600 p-2">
                {session?.user?.email?.[0].toUpperCase()}
              </div>
            </Avatar>
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{session?.user?.email}</span>
            <span className="block truncate text-sm font-medium">
              Rol: {session?.user?.role}
            </span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => signOut()} icon={HiOutlineLogout}>
            Cerrar Sesión
          </Dropdown.Item>
        </Dropdown>
      </div>

      <Navbar.Collapse>
        {/* Visible para todos */}
        <Link href="/pages/logs" passHref>
          <Button color="gray" className="w-full md:w-auto">
            <HiOutlineViewList className="mr-2 size-5" />
            Ver Logs
          </Button>
        </Link>

        {/* Solo visible para admin */}
        {isAdmin && (
          <Link href="/pages/logs/upload" passHref>
            <Button color="gray" className="w-full md:w-auto">
              <HiOutlineDocumentAdd className="mr-2 size-5" />
              Subir Logs
            </Button>
          </Link>
        )}
      </Navbar.Collapse>

      <Navbar.Toggle />
    </Navbar>
  )
} 