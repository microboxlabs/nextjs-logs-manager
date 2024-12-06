import EditLogForm from "../components/EditLogForm";

export default function Log({ params }: { params: { id: string } }) {
  return (
    <>
      <h1>{`Registro ${params.id}`}</h1>
      <EditLogForm
        log={{ timestamp: "a", logLevel: "b", serviceName: "c", message: "d" }}
      />
    </>
  );
}
