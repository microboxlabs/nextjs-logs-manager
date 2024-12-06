export type ParsedLog = {
  timestamp: Date;
  level: string;
  service: string;
  message: string;
}

export const parseLogLine = (line: string) => {
  const logPattern = /\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] \[(INFO|ERROR|WARNING)\] ([^:]+): (.+)/;

  const match = line.match(logPattern);
  if (!match) return null;

  // Ignora el string completo de match para separar cada
  // elemento asignándolo a las variables respectivas.
  const [, timestamp, level, service, message] = match;

  return {
    timestamp: new Date(timestamp),
    level,
    service,
    message: message.trim(),
  }
}