import { createUser, getUserById, getUserByUsername, getUsers } from '../models/User';

class UserController {
  static async listUsers() {
    try{
      const users = await getUsers();
      console.log('this is the user controller: ', users)
      return users;
    } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("No se pudo agregar el usuario.");
  }
  }
  static async getUser(username: string) {
    try{
      const user = await getUserByUsername(username);
      console.log('this is the user controller: ', user)
      return user;
    } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("No se pudo agregar el usuario.");
  }
  }

  static async addUser(username: string, password: string, role: string) {
    try {
      const newUser = await createUser(username, password, role);
      return newUser;
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("No se pudo agregar el usuario.");
    }
  }
}

export default UserController;