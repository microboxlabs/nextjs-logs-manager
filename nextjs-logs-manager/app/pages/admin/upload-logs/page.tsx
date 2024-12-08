'use client'

import { Card, Button } from 'flowbite-react'
import { HiInformationCircle, HiUpload, HiClock, HiExclamation, HiCheck } from 'react-icons/hi'
import { useUploadLogs } from './useUploadLogs'
import { useRef } from 'react'

export default function UploadLogsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
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

  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    reset()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Gestor de Logs
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Herramienta para procesar y almacenar logs del sistema de forma estructurada
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna de información */}
        <Card className="overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
            <h2 className="text-xl font-semibold flex items-center text-gray-900 dark:text-white mb-2">
              <HiInformationCircle className="mr-2 text-blue-500" />
              Guía de Formato
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Para garantizar un procesamiento correcto, cada línea de log debe seguir esta estructura
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Estructura Básica */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-3 text-gray-900 dark:text-white flex items-center">
                <HiCheck className="mr-2 text-green-500" />
                Estructura Requerida
              </h3>
              <code className="block bg-white dark:bg-gray-900 p-3 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                [2024-01-15 08:30:45] [INFO] Service-A: Mensaje del log.
              </code>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>Timestamp:</strong> Fecha y hora entre corchetes [YYYY-MM-DD HH:mm:ss]</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>Nivel:</strong> [INFO], [WARNING] o [ERROR]</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>Servicio:</strong> Service-X seguido de dos puntos (:)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>Mensaje:</strong> Texto descriptivo que termina con punto (.)</span>
                </li>
              </ul>
            </div>

            {/* Ejemplos */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-3 text-gray-900 dark:text-white flex items-center">
                <HiCheck className="mr-2 text-green-500" />
                Ejemplos Válidos
              </h3>
              <div className="bg-white dark:bg-gray-900 p-3 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 space-y-2">
                <p>[2024-01-15 08:30:45] [INFO] Service-A: Usuario autenticado correctamente.</p>
                <p>[2024-01-15 08:31:12] [WARNING] Service-B: Alto consumo de memoria detectado.</p>
                <p>[2024-01-15 08:32:00] [ERROR] Service-C: Fallo en la conexión a base de datos.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Columna de subida */}
        <Card className="overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
            <h2 className="text-xl font-semibold flex items-center text-gray-900 dark:text-white mb-2">
              <HiUpload className="mr-2 text-blue-500" />
              Subida de Logs
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sube tu archivo de logs y el sistema validará y procesará cada entrada automáticamente
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="flex items-center justify-center w-full">
              <label className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} 
                ${selectedFile ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'}
                ${error ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20' : ''}`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                  {isLoading ? (
                    <div className="text-center">
                      <div className="w-16 h-16 mb-4 relative">
                        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                        <HiClock className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Procesando archivo...
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Esto puede tomar unos segundos
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className={`p-4 rounded-full mb-4 transition-colors
                        ${selectedFile ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-800'}
                        ${error ? 'bg-red-100 dark:bg-red-800' : ''}`}
                      >
                        <HiUpload className={`w-8 h-8 
                          ${selectedFile ? 'text-green-500' : 'text-gray-500'}
                          ${error ? 'text-red-500' : ''}`} 
                        />
                      </div>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click para seleccionar</span> o arrastra tu archivo
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        Solo archivos .txt hasta 5MB
                      </p>
                      {selectedFile && (
                        <div className="flex items-center gap-2 p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <p className="text-sm text-green-700 dark:text-green-200">
                            {selectedFile.name}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".txt"
                  onChange={onFileChange}
                  disabled={isLoading}
                />
              </label>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 text-red-800 bg-red-100 dark:bg-red-900/50 dark:text-red-200 rounded-lg">
                <HiExclamation className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {isSuccess && (
              <div className="flex items-center gap-2 p-4 text-green-800 bg-green-100 dark:bg-green-900/50 dark:text-green-200 rounded-lg">
                <div className="flex-shrink-0 w-5 h-5 relative">
                  <div className="w-5 h-5 border-2 border-green-500 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <p>Archivo procesado correctamente</p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                color="gray"
                onClick={handleReset}
                disabled={isLoading}
                className="px-6"
              >
                Limpiar
              </Button>
              <Button
                type="submit"
                disabled={!selectedFile || isLoading}
                className={`px-6 relative ${selectedFile ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
              >
                {isLoading ? (
                  <>
                    <span className="opacity-0">Procesar</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </>
                ) : (
                  <>
                    <HiUpload className="w-5 h-5 mr-2" />
                    Procesar
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
} 