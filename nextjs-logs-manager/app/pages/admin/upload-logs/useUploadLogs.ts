import { useState } from 'react'
import { processRawLogs } from '@/app/api/services/logProcessor'


type UploadStatus = 'idle' | 'loading' | 'success' | 'error'

// Configuración de validación
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const VALID_MIME_TYPES = ['text/plain']

/**
 * Hook para manejar la subida y procesamiento de archivos de logs
 * @returns Objeto con estados y métodos para manejar la subida
 */
export const useUploadLogs = () => {
  const [status, setStatus] = useState<UploadStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  /**
   * Valida el archivo seleccionado
   * @param file - Archivo a validar
   * @returns Mensaje de error o null si es válido
   */
  const validateFile = (file: File): string | null => {
    if (!VALID_MIME_TYPES.includes(file.type)) {
      return 'Solo se permiten archivos de texto (.txt)'
    }

    if (file.size > MAX_FILE_SIZE) {
      return 'El archivo no debe superar los 5MB'
    }

    return null
  }

  /**
   * Maneja la selección de archivo
   * @param file - Archivo seleccionado
   */
  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file)
    setError(null)
    setStatus('idle')

    if (file) {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        setSelectedFile(null)
      }
    }
  }

  /**
   * Procesa el archivo seleccionado
   * @returns Promise que resuelve cuando se completa el procesamiento
   */
  const processFile = async () => {
    if (!selectedFile) {
      setError('No se ha seleccionado ningún archivo')
      return
    }

    try {
      setStatus('loading')
      setError(null)

      const text = await selectedFile.text()
      
      if (!text.trim()) {
        throw new Error('El archivo está vacío')
      }

      const lines = text.split('\n').filter(line => line.trim())
      console.log('Líneas a procesar:', lines.length)

      // Verificar formato básico de logs
      const invalidLines = lines.filter(line => {
        const isValid = /^\[\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\]\s\[(INFO|WARNING|ERROR)\]\sService-[A-Z]:\s.+\.$/.test(line.trim())
        if (!isValid) {
          console.log('Línea inválida:', line)
        }
        return !isValid
      })

      if (invalidLines.length > 0) {
        throw new Error(`Se encontraron ${invalidLines.length} líneas con formato inválido`)
      }

      // Procesar y guardar los logs (ahora processRawLogs hace ambas cosas)
      processRawLogs(text)
      
      setStatus('success')
      setSelectedFile(null)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Error al procesar el archivo')
    }
  }

  /**
   * Reinicia el estado del upload
   */
  const reset = () => {
    setStatus('idle')
    setError(null)
    setSelectedFile(null)
  }

  return {
    status,
    error,
    selectedFile,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    handleFileSelect,
    processFile,
    reset
  }
} 