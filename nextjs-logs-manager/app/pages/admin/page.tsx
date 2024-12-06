'use client'

import { Card } from 'flowbite-react'

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Estás logueado con rol ADMIN
        </h1>
      </Card>
    </div>
  )
} 