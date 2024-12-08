export enum LogLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}

export enum LogService {
  SERVICE_A = 'Service-A',
  SERVICE_B = 'Service-B',
  SERVICE_C = 'Service-C'
}

export interface LogEntry {
  id: string
  timestamp: string
  level: LogLevel
  service: LogService
  message: string
} 