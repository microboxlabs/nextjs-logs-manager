import { z } from "zod";

const LogEntrySchema = z.object({
  timestamp: z.string(),
  level: z
    .string()
    .refine((val) => ["INFO", "WARNING", "ERROR"].includes(val), {
      message: "Invalid log level",
    }),
  service: z.string(),
  message: z.string(),
});

export function parseLogEntry(logLine: string) {
  const regex =
    /\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] \[(INFO|WARNING|ERROR)\] ([\w-]+): (.+)/;
  const match = logLine.match(regex);

  if (!match) return null;

  const [, timestamp, level, service, message] = match;

  const parsedEntry = LogEntrySchema.safeParse({
    timestamp,
    level,
    service,
    message,
  });

  return parsedEntry.success ? parsedEntry.data : null;
}

export function parseLogFile(fileContent: string) {
  return fileContent
    .split("\n")
    .map(parseLogEntry)
    .filter((entry) => entry !== null);
}
