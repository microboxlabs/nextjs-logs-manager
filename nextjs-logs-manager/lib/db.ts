import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db: any = null;

async function openDb() {
  if (!db) {
    db = await open({
      filename: "./logs.sqlite",
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT,
        level TEXT,
        service TEXT,
        message TEXT
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        role TEXT
      )
    `);
  }
  return db;
}

export async function insertLog(log: {
  timestamp: string;
  level: string;
  service: string;
  message: string;
}) {
  const db = await openDb();
  await db.run(
    "INSERT INTO logs (timestamp, level, service, message) VALUES (?, ?, ?, ?)",
    [log.timestamp, log.level, log.service, log.message],
  );
}

export async function getLogs() {
  const db = await openDb();
  return db.all("SELECT * FROM logs ORDER BY timestamp DESC");
}

export async function getUser(username: string) {
  const db = await openDb();
  return db.get("SELECT * FROM users WHERE username = ?", [username]);
}

export async function createUser(username: string, role: string) {
  const db = await openDb();
  await db.run("INSERT INTO users (username, role) VALUES (?, ?)", [
    username,
    role,
  ]);
}

export { openDb };
