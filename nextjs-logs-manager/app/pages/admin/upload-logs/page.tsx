'use client'

import React from 'react'
import { Card } from 'flowbite-react'

export default function UploadLogsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Subir Logs
        </h1>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Subir archivo de logs</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          El archivo debe contener logs en el formato:
          <br />
          <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 text-xs">
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