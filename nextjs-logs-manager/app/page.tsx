import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">Bienvenid@</h1>
      <p className="mb-6 text-lg">
        Welcome to LogsManager. Here you can manage and view all your logs
        efficiently.
      </p>
      <Link href="/login" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
        Get Started
      </Link>
    </div>
  );
}
