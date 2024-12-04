"use server";

import bcrypt from "bcrypt";
import { createSession } from "../_lib/session";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaClient } from "@prisma/client";

export const Register = async (prevState: any, formData: FormData) => {
  const prisma = new PrismaClient();

  // validate that the data is not empty (make better for later, things like the password might need a especific length identifier)
  const form_fields = ["username", "password", "role"];

  form_fields.forEach((field) => {
    if (!formData.get(field)) {
      return { message: "The field {" + field + "} can't be empty" };
    }
  });

  // create the user
  const user = {
    username: formData.get("username") as string,
    role: formData.get("role") as string,
    password: formData.get("password") as string,
  };

  const hashedPassword = await bcrypt.hash(user.password, 10);

  // i do this because for some reason the try and catch dont allow the correct call of redirect (and i use it in createSession)
  let userData;

  try {
    userData = await prisma.user.create({
      data: {
        username: user.username.trim(),
        roleId: parseInt(user.role),
        password: hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002": {
          return { message: "This username is already in use" };
        }
      }
      return { message: "Something went wrong: " + error.message };
    }
  } finally {
    await prisma.$disconnect();
  }

  if (userData != null) {
    await createSession(userData.id, userData.roleId);
  }
};
