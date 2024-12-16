import { Table } from "@/components/Table";
import { getStatus } from "../../utils/getStatus";
import { getService } from "../../utils/getService";
import { getInitData } from "../../utils/getInitData";

export default async function DashboardPage() {

    const dataLogs = await getInitData()
    const dataStatus = await getStatus()
    const dataServices = await getService()
    return (
        <main className="flex flex-col gap-8">
            <div className="text-3xl">Dashboard</div>
            <Table initData={dataLogs} dataStatus={dataStatus} dataServices={dataServices} />
        </main>
    );

}
