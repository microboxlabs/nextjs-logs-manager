import { PrismaClient } from "@prisma/client";
import EntriesTable from "../components/EntriesTable";

const primsa = new PrismaClient();

export default async function Entries() {
  const entries = await primsa.entry.findMany();
  await primsa.$disconnect();

  return (
    <>
      <h1>Subidas</h1>
      <EntriesTable entries={entries} />
    </>
  );
}
