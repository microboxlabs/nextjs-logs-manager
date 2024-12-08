import Link from "next/link";
import { PrismaClient } from "@prisma/client";

import LogsTable from "./components/LogsTable";
import Heading from "./components/Heading";

const primsa = new PrismaClient();

export default async function Logs() {
  const logs = await primsa.log.findMany();
  await primsa.$disconnect();

  return (
    <>
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <Heading>Registros</Heading>
        <Link href="/upload" className="btn bg-green-700">
          Subir registros
        </Link>
      </header>
      <LogsTable logs={logs} />
    </>
  );
}
