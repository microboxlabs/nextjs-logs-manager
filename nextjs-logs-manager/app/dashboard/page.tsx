import { DashboardTable } from "@/components/DashboardTable";
import LogFilters from "@/components/LogFilters";
import { NavbarWrapper } from "@/components/Navbar/NavbarWrapper";
import { FilterProvider } from "@/contexts/FilterContext";
import { auth } from "@/lib/auth";
import { getLogs } from "@/lib/db";
import { Log } from "@/lib/schemas";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const logs = (await getLogs()) as Log[];

  return (
    <FilterProvider>
      <NavbarWrapper />
      <div className="p-4">
        <LogFilters />
        <DashboardTable logs={logs} />
      </div>
    </FilterProvider>
  );
}
