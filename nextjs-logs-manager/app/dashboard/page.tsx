import { Table } from "@/components/Table";
export default async function DashboardPage() {


    return (
        <main className="flex flex-col gap-8">
            <div className="text-3xl">Dashboard</div>
            <div className="flex flex-col gap-1">
                <p>Metrics</p>
                <p className="px-2 py-3 text-center border rounded">40 logs</p>
                <div className="flex gap-1">
                    <p className="px-2 py-3 text-center flex-1 border rounded">8 info</p>
                    <p className="px-2 py-3 text-center flex-1 border rounded">12 warning</p>
                    <p className="px-2 py-3 text-center flex-1 border rounded">20 error</p>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <p>Logs</p>
                <Table />
            </div>


        </main>
    );
}