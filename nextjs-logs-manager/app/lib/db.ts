import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db: any;

export async function getDb() {
  if (!db) {
    db = await open({
      filename: './app/db/mydatabase.db',
      driver: sqlite3.Database,
    });
  }
  return db;
}