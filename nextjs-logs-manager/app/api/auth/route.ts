import { PrismaClient } from "@prisma/client";
import type { TLoginResponse } from "@/app/shared/types";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const credentials = await request.json();

  try {
    const account = await prisma.account.findFirstOrThrow({
      where: { email: credentials.email },
    });
    // console.log(credentials);
    // console.log(account);

    if (account.password !== credentials.password) {
      return Response.json("Credenciales incorrectos", { status: 401 });
    }

    const data: TLoginResponse = {
      token: "123",
      account: {
        id: account.id,
        email: account.email,
        username: account.username,
        roleId: account.roleId,
      },
    };

    return Response.json(data);
  } catch (error) {
    return Response.error();
  }
}
