import { PrismaClient } from "@prisma/client";

import EntriesTable from "../components/EntriesTable";
import Heading from "../components/Heading";

const primsa = new PrismaClient();

export default async function Entries() {
  const entries = await primsa.entry.findMany();
  await primsa.$disconnect();

  return (
    <>
      <Heading className="mb-8">Subidas</Heading>
      <EntriesTable entries={entries} />
    </>
  );
}
