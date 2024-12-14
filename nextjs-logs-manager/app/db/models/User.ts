import { getDb } from '../../lib/db';

export async function initUserTable() {
  const db = await getDb();
  
  await db.exec(
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'REGULAR'
      );`
    );
}

function validRole(role: string){
  const validRole = ['ADMIN', 'REGULAR']

  if(validRole.includes(role)){
    return true
  }
  return false
} 

export async function createUser(username: string, password: string, role: string) {
  const db = await getDb()
  
  await initUserTable();
  role = role || 'REGULAR'
  if(validRole(role)){
    const result = await db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role]);
    return { id: result.lastID, username };
  }
  throw Error('error al crear un usuario')
}


export async function getUserByUsername(username: string) {
    const db = await getDb();
    await initUserTable();
    return await db.get('SELECT id, username FROM users WHERE username = ?', [username]);
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