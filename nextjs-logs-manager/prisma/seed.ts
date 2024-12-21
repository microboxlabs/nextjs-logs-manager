import { PrismaClient } from "@prisma/client";
import PasswordSecurity from "@/src/modules/auth/domain/PasswordSecurity";

const prisma = new PrismaClient();

async function main() {
  const [adminRole, userRole] = await Promise.all([
    prisma.role.upsert({
      where: { name: "admin" },
      update: {},
      create: { name: "admin" },
    }),
    prisma.role.upsert({
      where: { name: "user" },
      update: {},
      create: { name: "user" },
    }),
  ]);

  console.log("Roles created");

  const security = new PasswordSecurity();
  await Promise.all([
    prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        email: "admin@example.com",
        password: await security.hash("a04223bd6e21cc921eafed9944217959"),
        fullName: "Admin",
        roleId: adminRole.id,
      },
    }),
    prisma.user.upsert({
      where: { email: "norma.collins@example.com" },
      update: {},
      create: {
        email: "norma.collins@example.com",
        password: await security.hash("a0dbf7aada542cc93ff84a79f4a846c6"),
        fullName: "Norma Collins",
        roleId: userRole.id,
      },
    }),
  ]);

  console.log("Users created");

  // create log levels
  await prisma.logLevel.createMany({
    data: [{ name: "INFO" }, { name: "WARNING" }, { name: "ERROR" }],
  });

  console.log("Log levels created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
