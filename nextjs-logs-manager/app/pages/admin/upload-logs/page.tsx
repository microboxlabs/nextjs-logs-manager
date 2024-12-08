'use client'

import { Card, FileInput, Button, Alert } from 'flowbite-react'
import { HiInformationCircle, HiUpload } from 'react-icons/hi'
import { useUploadLogs } from './useUploadLogs'

export default function UploadLogsPage() {
  const {
    handleFileSelect,
    processFile,
    isLoading,
    isSuccess,
    isError,
    error,
    reset,
    selectedFile
  } = useUploadLogs()

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleFileSelect(file)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await processFile()
  }

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
            <HiInformationCircle className="mr-2 text-blue-500" />
            Formato Requerido
          </h2>
          
          <div className="space-y-6">
            {/* Estructura Básica */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2 text-gray-900 dark:text-white">
                Estructura del Log
              </h3>
              <code className="block bg-white dark:bg-gray-900 p-3 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                [TIMESTAMP] [NIVEL] SERVICIO: Mensaje
              </code>
            </div>

            {/* Niveles Permitidos */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-3 text-gray-900 dark:text-white">
                Niveles Permitidos
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-between">
                  <span>INFO</span>
                  <span className="text-xs text-green-600 dark:text-green-400">Información general del sistema</span>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-between">
                  <span>WARNING</span>
                  <span className="text-xs text-yellow-600 dark:text-yellow-400">Alertas y advertencias</span>
                </div>
                <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-between">
                  <span>ERROR</span>
                  <span className="text-xs text-red-600 dark:text-red-400">Errores y fallos críticos</span>
                </div>
              </div>
            </div>

            {/* Ejemplo */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2 text-gray-900 dark:text-white">
                Ejemplo
              </h3>
              <div className="space-y-2">
                <code className="block bg-white dark:bg-gray-900 p-3 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                  [2024-01-01 10:00:00] [INFO] Service-A: Usuario autenticado
                </code>
                <code className="block bg-white dark:bg-gray-900 p-3 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                  [2024-01-01 10:01:00] [ERROR] Service-B: Error de conexión
                </code>
              </div>
            </div>
          </div>
        </Card>

        {/* Columna de subida */}
        <Card>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <HiUpload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click para subir</span> o arrastra y suelta
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Archivo TXT (MAX. 5MB)
                  </p>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                      Archivo seleccionado: {selectedFile.name}
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".txt"
                  onChange={onFileChange}
                  disabled={isLoading}
                />
              </label>
            </div>

            {error && (
              <div className="p-4 text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-lg">
                {error}
              </div>
            )}

            {isSuccess && (
              <div className="p-4 text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded-lg">
                Archivo procesado correctamente
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                color="gray"
                onClick={reset}
                disabled={isLoading}
              >
                Limpiar
              </Button>
              <Button
                type="submit"
                disabled={!selectedFile || isLoading}
                className="relative"
              >
                {isLoading ? (
                  <>
                    <span className="opacity-0">Procesar</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </>
                ) : (
                  'Procesar'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
} 