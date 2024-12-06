export interface LogEntry {
  id: string;
  timestamp: Date;
  level: string;
  service: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}