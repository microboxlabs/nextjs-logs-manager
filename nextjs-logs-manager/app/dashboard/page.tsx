import { LogsInfo } from "@/components/LogsInfo";
import { Table } from "@/components/Table";
import { apiUrl } from "@/constants/routes";



export default async function DashboardPage() {
    const resp = await fetch(`${apiUrl}/log`, {
        cache: "no-store"
    })
    const data = await resp.json()
    console.log(data)
    return (
        <main className="flex flex-col gap-8">
            <div className="text-3xl">Dashboard</div>
            <LogsInfo />
            <Table initData={data} />
        </main>
    );
}