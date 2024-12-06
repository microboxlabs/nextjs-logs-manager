import { getAllLogs } from "@/actions";
import { LogsTable } from "./ui/LogsTable";
import Link from "next/link";
import { auth } from "@/auth";
import { DashboardCards } from "./ui/DashboardCards";

export default async function DashboardPage() {
  const session = await auth();
  const { logs } = await getAllLogs();
  
  return (
    <div className="flex flex-col p-5">
      <div className="mb-3 flex justify-between p-3">
        <h1 className="text-xl font-bold">Log entries</h1>
        {
          session?.user.role === "admin" && (
            <Link href="/app-logs/upload" className="btn-primary">Upload logs</Link>
          )
        }
      </div>
      <DashboardCards logs={logs!}/>
      <LogsTable logs={logs!} />
    </div>
  );
}