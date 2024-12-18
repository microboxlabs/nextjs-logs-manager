import { getDb } from "@/app/lib/db";
import bcrypt from "bcrypt";

export async function initUserTable() {
  const db = await getDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'REGULAR'
    );
  `);
}

function validRole(role: string) {
  const validRoles = ["ADMIN", "REGULAR"];
  return validRoles.includes(role);
}

export async function createUser(username: string, email: string, password: string, role: string) {
  const db = await getDb();
  await initUserTable();
  role = role || "REGULAR";

  if (!validRole(role)) throw new Error("Invalid role");

  const hashedPassword = await bcrypt.hash(password, 10); // Hash con salt rounds = 10
  const result = await db.run(
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
    [username, email, hashedPassword, role]
  );
  return { id: result.lastID, username, email, role };
}

export async function getUserByUsernameOrEmail(input: string) {
  const db = await getDb();
  await initUserTable();
  return await db.get(
    "SELECT id, username, email, password, role FROM users WHERE username = ? OR email = ?",
    [input, input]
  );
}
export async function getUserById(id: number) {
    const db = await getDb();
    await initUserTable();
    return await db.get('SELECT id, username FROM users WHERE id = ?', [id]);
}
export async function DeleteUserById(id: number) {
    const db = await getDb();
    await initUserTable();
    return await db.delete('DELETE FROM users WHERE id = ?', [id]);
}

export async function getUsers() {
  const db = await getDb();
  await initUserTable();
  return await db.all('SELECT id, username FROM users');
}