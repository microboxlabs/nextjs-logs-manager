import { auth } from "@/auth";
import { LoginForm } from "@/components/LoginForm";
import { loginErrors } from "@/constants/constants";
import { redirect } from "next/navigation";


export default async function Home({ searchParams }: { searchParams: { error?: string } }) {
  const error = searchParams?.error;
  const session = await auth()
  if (session) return redirect('/dashboard')

  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      <h1 className="text-5xl">Login</h1>
      <LoginForm />
      {error && <p className="text-red-500">{loginErrors[error as keyof typeof loginErrors] || "Error desconocido"}</p>}
    </main>
  );
}
