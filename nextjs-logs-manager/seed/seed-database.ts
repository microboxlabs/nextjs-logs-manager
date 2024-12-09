import { prisma } from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  // Vaciar la base de datos
  await prisma.user.deleteMany();

  const { users } = initialData;

  // Insertar desde el seed en DB
  await prisma.user.createMany({
    data: users,
  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
