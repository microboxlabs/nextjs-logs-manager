import { LogLevel, LogService, LogEntry } from '@/types/logs'

export const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2024-11-01 10:00:00',
    level: LogLevel.INFO,
    service: LogService.SERVICE_A,
    message: 'Log de prueba traido desde la API'
  },
  {
    id: '2',
    timestamp: '2024-11-01 10:01:00',
    level: LogLevel.ERROR,
    service: LogService.SERVICE_B,
    message: 'Error de prueba traido desde la API'
  },
  {
    id: '3',
    timestamp: '2024-11-01 10:02:00',
    level: LogLevel.WARNING,
    service: LogService.SERVICE_C,
    message: 'Tiempo de respuesta lento.'
  }
] 