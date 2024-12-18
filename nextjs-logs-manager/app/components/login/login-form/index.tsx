"use client";

import { useState } from "react";
import { RiEyeLine, RiLoginBoxLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      setLoading(true);
      setError(null);

      const result = await signIn("credentials", {
        username,
        password,
        redirect: false, // Evita redirección automática
      });

      if (!result?.ok) {
        setError("Authentication failed. Check your credentials.");
        return;
      }

      // Verificar el rol del usuario después del login
      const sessionResponse = await fetch("/api/auth/session");
      const session = await sessionResponse.json();

      if (session?.user.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (session?.user.role === "REGULAR") {
        router.push("/dashboard/regular");
      } else {
        setError("User role not recognized.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="w-[400px] bg-gray-50 rounded-md shadow-md px-12 py-8 flex flex-col items-center border border-gray-300">
      <h3 className="text-xl font-semibold">Login</h3>
      <form onSubmit={handleSubmit} className="mt-4 w-full">
        <div className="flex flex-col mt-2">
          <div className="border border-gray-300 p-2 rounded-md bg-gray-100 flex gap-2 items-center">
            <AiOutlineUser className="w-5 h-5 text-gray-600" />
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="focus:outline-none bg-gray-100 text-xs placeholder:text-xs"
            />
          </div>
          <div className="border border-gray-300 p-2 rounded-md bg-gray-100 flex gap-2 items-center justify-between mt-6">
            <RiEyeLine
              className="w-4 h-4 cursor-pointer text-gray-600"
              onClick={() => setViewPassword(!viewPassword)}
            />
            <input
              type={viewPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="focus:outline-none bg-gray-100 text-xs placeholder:text-xs"
            />
          </div>
          <button
            type="submit"
            className="bg-neutral-700 text-white font-semibold p-2 rounded-md mt-6 hover:bg-neutral-500 flex items-center justify-center h-10"
          >
            {loading ? (
              <RiLoginBoxLine className="h-5 w-5 animate-spin" />
            ) : (
              "Login"
            )}
          </button>
          {error && <p className="text-red-500 text-xs mt-2 w-full text-center">{error}</p>}
        </div>
      </form>
    </div>
  );
}