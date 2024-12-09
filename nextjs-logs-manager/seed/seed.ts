import bcryptjs from "bcryptjs";

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      email: "admin@test.com",
      password: bcryptjs.hashSync("123456"),
      name: "Admin Test",
      role: "admin",
    },
    {
      email: "user@test.com",
      password: bcryptjs.hashSync("123456"),
      name: "User Test",
      role: "user",
    },
  ],
};
