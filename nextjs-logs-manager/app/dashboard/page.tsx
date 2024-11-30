import {
  DarkThemeToggle,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
} from "flowbite-react";
import DashboardElement from "./components/dashboard_elements";
import DashboardData from "./components/dashboard_data";
import { PrismaClient } from "@prisma/client";

const Main = () => {
  const prisma = new PrismaClient();

  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      <div className="overflow-x-auto">
        <Table striped>
          <TableHead>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Time</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Service name</TableHeadCell>
            <TableHeadCell>Message</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <DashboardElement
              date={"2024-11-01"}
              hour={"10:00:00"}
              type={"INFO"}
              service_name={"Service-A"}
              message={"Successfully completed task."}
            />
            <DashboardElement
              date={"2024-11-01"}
              hour={"10:01:00"}
              type={"ERROR"}
              service_name={"Service-B"}
              message={"Failed to connect to the database."}
            />
            <DashboardElement
              date={"2024-11-01"}
              hour={"10:02:00"}
              type={"WARNING"}
              service_name={"Service-C"}
              message={"Failed to connect to the database."}
            />
          </TableBody>
        </Table>
      </div>

      <DarkThemeToggle />
    </main>
  );
};

export default Main;
