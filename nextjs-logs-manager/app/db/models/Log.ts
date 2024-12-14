import { getDb } from '../../lib/db';

export async function initLogsTable() {
  const db = await getDb();
  
  await db.exec(
    `CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        level TEXT NOT NULL,
        service TEXT NOT NULL,
        message TEXT NOT NULL
      );`
    );
}

function isValidLogLevel(level: string) {
  const validLevels = ['INFO', 'WARNING', 'ERROR'];
  const sanitizedLevel = level.replace(/[\[\]\s]/g, '').toUpperCase();
  return validLevels.includes(sanitizedLevel);
}

export async function createLogs(
  timestamp: string, 
  level: string, 
  service: string, 
  message: string 
) {
  if (!isValidLogLevel(level)) {
    throw new Error(`Invalid log level: ${level}`);
  }

  const db = await getDb();
  await initLogsTable();

  const result = await db.run(
    'INSERT INTO logs (timestamp, level, service, message) VALUES (?, ?, ?, ?)', 
    [timestamp, level.toUpperCase(), service, message]
  );
  return { id: result.lastID, timestamp, level, service, message };
}

export async function getLogs() {
  const db = await getDb();
  await initLogsTable()
  return await db.all('SELECT id, timestamp, level, service, message FROM logs')
}