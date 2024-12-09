import Link from "next/link";

export const NotAuthenticated = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p>No tienes los permisos necesarios para acceder a este contenido</p>
      <Link href="/" className="text-blue-500 underline">
        Volver al inicio
      </Link>
    </div>
  );
}
