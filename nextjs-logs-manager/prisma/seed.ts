import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.account.createMany({
    data: [
      {
        email: "admin@prueba.com",
        password: "admin123",
        username: "admin",
        roleId: 1,
      },
      {
        email: "usuario@prueba.com",
        password: "usuario123",
        username: "usuario",
        roleId: 2,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
