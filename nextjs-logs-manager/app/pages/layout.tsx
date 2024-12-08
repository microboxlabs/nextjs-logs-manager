'use client'

import { MainNavbar } from '@/components/navigation/Navbar'

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainNavbar />
      <main className="container mx-auto p-4 pt-24">
        {children}
      </main>
    </div>
  )
} 