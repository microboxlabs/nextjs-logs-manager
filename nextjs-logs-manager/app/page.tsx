import Link from "next/link";

import LogsTable from "./components/LogsTable";
import { PrismaClient } from "@prisma/client";

const primsa = new PrismaClient();

export default async function Logs() {
  const logs = await primsa.log.findMany();
  await primsa.$disconnect();

  return (
    <>
      <h1>Registros</h1>
      <Link href="/upload">Subir registros</Link>
      <LogsTable logs={logs} />
    </>
  );
}
