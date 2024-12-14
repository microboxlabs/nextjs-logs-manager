import { logout } from "@/actions/loginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth()
    if (!session) return redirect('/')
    return (
        <div>
            <pre>{JSON.stringify(session?.user, null, 2)}</pre>

        </div>
    );
}