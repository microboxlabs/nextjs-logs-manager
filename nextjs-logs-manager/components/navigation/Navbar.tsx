'use client'

import { Avatar, Dropdown, DarkThemeToggle } from 'flowbite-react'
import { useSession, signOut } from 'next-auth/react'
import { HiOutlineLogout, HiUser, HiOutlineDocumentText, HiOutlineUpload, HiMenuAlt2 } from 'react-icons/hi'
import { useState } from 'react'
import Link from 'next/link'

export function MainNavbar() {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN'
  const username = session?.user?.email?.split('@')[0]
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-800/80">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo y Navegación Desktop */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              Logs Manager
            </span>
          </Link>

          {/* Links de Navegación Desktop */}
          <div className="hidden items-center gap-3 md:flex">
            <Link 
              href="/pages/logs" 
              className="group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <HiOutlineDocumentText className="size-5 transition-transform group-hover:scale-110" />
              Ver Logs
            </Link>
            {isAdmin && (
              <Link 
                href="/pages/admin/upload-logs" 
                className="group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <HiOutlineUpload className="size-5 transition-transform group-hover:scale-110" />
                Subir Logs
              </Link>
            )}
          </div>
        </div>

        {/* Acciones y Usuario */}
        <div className="flex items-center gap-6">
          {/* Usuario Desktop */}
          <div className="hidden md:block">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <HiUser className="size-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  {username && (
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {username}
                    </span>
                  )}
                </div>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium">
                  {session?.user?.email}
                </span>
                <span className="block truncate text-xs text-gray-500">
                  {session?.user?.role}
                </span>
              </Dropdown.Header>
              <Dropdown.Item icon={HiOutlineLogout} onClick={() => signOut()}>
                Cerrar Sesión
              </Dropdown.Item>
            </Dropdown>
          </div>

          {/* Toggle Tema */}
          <div className="border-l border-gray-200 pl-6 dark:border-gray-700">
            <DarkThemeToggle className="focus:ring-2" />
          </div>

          {/* Botón Menú Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
          >
            <HiMenuAlt2 className="size-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Menú Mobile */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:hidden">
          <div className="flex flex-col space-y-4 p-4">
            {/* Usuario Mobile */}
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-600">
                <HiUser className="size-5 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {username}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {session?.user?.role}
                </p>
              </div>
            </div>

            {/* Links Mobile */}
            <Link 
              href="/pages/logs"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <HiOutlineDocumentText className="size-5" />
              Ver Logs
            </Link>
            {isAdmin && (
              <Link 
                href="/pages/admin/upload-logs"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <HiOutlineUpload className="size-5" />
                Subir Logs
              </Link>
            )}

            {/* Cerrar Sesión Mobile */}
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <HiOutlineLogout className="size-5" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  )
} 