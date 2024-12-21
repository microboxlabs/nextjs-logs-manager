"use client";

import useFilterStore from "@/src/hooks/use-log-filters";
import FileUploader from "@/src/components/dashboard/uploader/FileUploader";
import AuthUserRole from "@/src/modules/auth/domain/AuthUserRole";
import LogTable from "@/src/components/dashboard/table/LogTable";
import UpdateRecordsButton from "@/src/components/dashboard/UpdateRecordsButton";

interface LogTableProps {
  role?: AuthUserRole;
}

export default function LogTableWrapper({ role }: LogTableProps) {
  const isAdmin = role === AuthUserRole.admin;

  return (
    <div className="flex size-full flex-col items-center justify-center rounded-lg bg-white p-[clamp(8px,2vh,8rem)] dark:bg-slate-900">
      <div className="flex flex-row items-center justify-center">
        <UpdateRecordsButton />
        {isAdmin && <FileUploader />}
      </div>
      <LogTable />
    </div>
  );
}
