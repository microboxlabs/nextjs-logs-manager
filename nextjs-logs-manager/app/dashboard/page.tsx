import { logout } from "@/actions/loginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth()
    if (!session) return redirect('/')
    return (
        <div>
            <pre>{JSON.stringify(session?.user, null, 2)}</pre>
            <form action={logout}>
                <button type="submit" className="p-2 text-white bg-blue-500 hover:bg-blue-600  rounded">Logout</button>
            </form>
        </div>
    );
}