"use client";
import { useCallback, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

const SignoutPage = ({ params: { callbackUrl, error: errorType } }: any) => {
  const session = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignout = useCallback(async () => {
    setIsLoading(true);
    await signOut({
      callbackUrl: callbackUrl || "/",
    });

    setIsLoading(false);
  }, [callbackUrl]);

  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="mt-6 text-center text-xl font-bold tracking-tight text-white sm:text-2xl">
              Are you sure you want to sign out?
            </h1>
            <p className="mt-4 text-center text-sm text-gray-400">
              Or{" "}
              <Link
                href="/"
                className="font-medium  text-emerald-500  underline hover:text-emerald-400"
              >
                go back to home
              </Link>
            </p>
          </div>

          <div>
            <button
              onClick={handleSignout}
              className="btn-sm group w-full bg-indigo-500 text-sm text-white shadow-sm hover:bg-indigo-600"
            >
              Sign Out{" "}
              <span className="ml-1 tracking-normal text-sky-300 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">
                -&gt;
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignoutPage;
