import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.account.createMany({
    data: [
      {
        email: "admin@test.com",
        password: "admin123",
        username: "admin",
        roleId: 1,
      },
      {
        email: "user@test.com",
        password: "user123",
        username: "user",
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
