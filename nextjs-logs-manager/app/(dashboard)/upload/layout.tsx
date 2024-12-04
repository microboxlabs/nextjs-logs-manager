import { auth } from "@/auth";
import Link from "next/link";

export default async function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || session?.user.role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>No tienes los permisos necesarios para acceder a este contenido</p>
        <Link href="/" className="text-blue-500 underline">Volver al inicio</Link>
      </div>
    )
  }
  
  return (
    <div>
      {children}
    </div>
  );
}
