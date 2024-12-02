"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { createSession } from "../_lib/session";

export const Login = async (prevState: any, formData: FormData) => {
  const prisma = new PrismaClient();

  // Validate that the username and password fields are not empty
  const form_fields = ["username", "password"];
  for (const field of form_fields) {
    if (!formData.get(field)) {
      console.error(`The field ${field} can't be empty`);
      return null; // Return early if any field is empty
    }
  }

  // Retrieve user credentials from form data
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user
    .findUnique({
      where: { username: username.trim() },
    })
    .catch((err) => {
      null;
    });

  if (user && (await bcrypt.compare(password, user.password))) {
    await createSession(user.id, user.roleId);
  } else {
    return { message: "The username or password was wrong" };
  }
};
