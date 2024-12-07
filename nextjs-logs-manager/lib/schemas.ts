import { z } from "zod";

export interface Log {
  id: number;
  timestamp: string;
  level: string;
  service: string;
  message: string;
}

export const logEntrySchema = z.object({
  timestamp: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, "Timestamp is required"),
  level: z.enum(["INFO", "WARNING", "ERROR"]),
  service: z.string().min(1, "Service name is required"),
  message: z.string().min(1, "Message is required"),
});

export type LogEntry = z.infer<typeof logEntrySchema>;
