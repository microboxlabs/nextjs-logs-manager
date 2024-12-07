'use client'

import { Card } from 'flowbite-react'

export default function UploadLogsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Subir Logs
        </h1>
      </div>

      <Card>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          El archivo debe contener logs en el formato:
          <br />
          <code className="mt-2 block rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
            [2024-11-01 10:00:00] [INFO] Service-A: Successfully completed task.
            <br />
            [2024-11-01 10:01:00] [ERROR] Service-B: Failed to connect to the database.
            <br />
            [2024-11-01 10:02:00] [WARNING] Service-C: Response time is slow.
          </code>
        </p>
        {/* Aquí irá el componente de subida de archivos */}
      </Card>
    </div>
  )
} 