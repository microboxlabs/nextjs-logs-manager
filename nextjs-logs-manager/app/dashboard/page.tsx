import { Table } from "@/components/Table";
import { apiUrl } from "@/constants/routes";



export default async function DashboardPage() {
    const resp = await fetch(`${apiUrl}/log?limit=5`, {
        cache: "no-store"
    })
    const data = await resp.json()
    return (
        <main className="flex flex-col gap-8">
            <div className="text-3xl">Dashboard</div>
            <Table initData={data} />
        </main>
    );
}