import IUser from "@/types/IUser";
import bcrypt from "bcrypt";
import { Database } from "sqlite3";

const db = new Database(":memory:");

db.serialize(() => {
  db.run(
    `
    CREATE TABLE logs (
      id INTEGER PRIMARY KEY,
      timestamp TEXT,
      level TEXT,
      service TEXT,
      message TEXT
    );
  `,
    (err) => {
      if (err) {
        console.log("Error creating logs table:", err.message);
      } else {
        console.log("Logs table created successfully");
      }
    },
  );

  db.run(
    `
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    );
  `,
    (err) => {
      if (err) {
        console.log("Error creating users table:", err.message);
      } else {
        console.log("Users table created successfully");
      }
    },
  );

  db.run(
    `INSERT INTO users (username, password, role) VALUES
      ('admin', ?, 'admin'),
      ('user', ?, 'user');`,
    [bcrypt.hashSync("admin123", 10), bcrypt.hashSync("user123", 10)],
    (err) => {
      if (err) {
        console.log("Error inserting default users:", err.message);
      } else {
        console.log("Default users inserted successfully");
      }
    },
  );
});

// Función que inserta un log en la base de datos y emite el evento SSE
const addLog = (
  timestamp: string,
  level: string,
  service: string,
  message: string,
) => {
  db.run(
    "INSERT INTO logs (timestamp, level, service, message) VALUES (?, ?, ?, ?)",
    [timestamp, level, service, message],
    function (err) {
      if (err) {
        console.error("Error inserting log:", err);
      } else {
        // Emitir el log a los clientes conectados
        const log = { timestamp, level, service, message };
        db.emit("log", log); // Emite el evento SSE con los datos del log
      }
    },
  );
};

export const authenticateUser = (username: string): Promise<IUser | null> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, row: IUser) => {
        if (err) {
          reject(err);
        } else if (row) {
          resolve(row); // Return the user if passwords match
        } else {
          resolve(null); // Return null if not found or password doesn't match
        }
      },
    );
  });
};

export default db;
