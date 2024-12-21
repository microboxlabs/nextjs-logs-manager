import NarBar from "@/src/components/dashboard/NarBar";
import getActiveUser from "@/src/components/auth/getActiveUser";
import { redirect } from "next/navigation";
import LogTableWrapper from "@/src/components/dashboard/table/LogTableWrapper";
import Filters from "@/src/components/dashboard/filtering/Filters";
import LogTablePagination from "@/src/components/dashboard/table/LogTablePagination";

export default async function Page() {
  const user = await getActiveUser();
  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <NarBar fullName={user.fullName} />
      <Filters />
      <LogTableWrapper role={user.role} />
      <LogTablePagination />
    </>
  );
}
