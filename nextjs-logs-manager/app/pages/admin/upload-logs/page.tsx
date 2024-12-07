'use client'

import { Card, FileInput, Button } from 'flowbite-react'
import { HiInformationCircle, HiUpload } from 'react-icons/hi'

export default function UploadLogsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Subir Logs
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sube tus archivos de logs para procesarlos y visualizarlos en el sistema
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna de información */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
            <HiInformationCircle className="mr-2" />
            Formato Requerido
          </h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Estructura:
              </p>
              <code className="block bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-200">
                [YYYY-MM-DD HH:mm:ss] [LEVEL] SERVICE: Message
              </code>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Ejemplo:
              </p>
              <code className="block bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-200">
                [2024-01-01 10:00:00] [INFO] SERVICE_A: Usuario autenticado
              </code>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Niveles permitidos:
              </p>
              <div className="grid grid-cols-3 gap-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="text-center">INFO</div>
                <div className="text-center">WARNING</div>
                <div className="text-center">ERROR</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Columna de subida */}
        <Card>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Seleccionar Archivo
              </h3>
              <FileInput
                id="log-file"
                accept=".txt"
                helperText="Archivo de texto plano (.txt)"
              />
            </div>

            <Button className="w-full">
              <HiUpload className="mr-2 size-5" />
              Subir Archivo
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
} 