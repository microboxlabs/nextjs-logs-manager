import { createUser, getUserByUsernameOrEmail, getUsers } from "@/app/db/models/User";

class UserController {
  static async listUsers() {
    return await getUsers();
  }

  static async getUser(input: string) {
    return await getUserByUsernameOrEmail(input);
  }

  static async addUser(username: string, email: string, password: string, role: string) {
    return await createUser(username, email, password, role);
  }
}

export default UserController;