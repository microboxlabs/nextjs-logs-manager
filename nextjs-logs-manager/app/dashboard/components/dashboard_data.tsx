import { Table } from "flowbite-react";
import DashboardElement from "./dashboard_elements";

const LoadData = async () => {
  console.log("cosa");
};

const DashboardData = () => {
  console.log("server?");

  return (
    <Table.Body className="divide-y">
      <DashboardElement
        date={"2024-11-01"}
        hour={"10:00:00"}
        type={"INFO"}
        service_name={"Service-A"}
        message={"Successfully completed task."}
      />
    </Table.Body>
  );
};

export default DashboardData;
