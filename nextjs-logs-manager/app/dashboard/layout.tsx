import { auth } from "@/auth";
import { Sidebar } from "@/components/Sidebar";
import { routes } from "@/constants/routes";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await auth()
    if (!session) return redirect('/')

    const userRoutes = session?.user?.role === 'user'
        ? routes.filter(item => !item.roleAccess)
        : routes;

    return (
        <>
            <Sidebar userRoutes={userRoutes} />
            <main className="p-4 sm:ml-64 sm:h-screen flex-1">
                {children}
            </main>
        </>
    );

}