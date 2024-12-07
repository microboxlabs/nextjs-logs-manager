import EditLogForm from "../../components/EditLogForm";
import { PrismaClient } from "@prisma/client";

const primsa = new PrismaClient();

export default async function Log({ params }: { params: { id: string } }) {
  const foundLog = await primsa.log.findFirstOrThrow({
    where: { id: Number(params.id) },
  });

  return (
    <>
      <h1>{`Registro ${params.id}`}</h1>
      <EditLogForm log={foundLog} />
    </>
  );
}
