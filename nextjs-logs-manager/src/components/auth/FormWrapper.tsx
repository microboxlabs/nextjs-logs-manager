import { ReactNode } from "react";
import Link from "next/link";

export default function FormWrapper({
  children,
  page,
}: {
  children: ReactNode;
  page: "login" | "register";
}) {
  return (
    <div className="flex w-full flex-col items-center gap-[clamp(8px,2vh,8rem)] ">
      <ul className="flex w-fit flex-row gap-4 rounded-sm bg-slate-100 p-1.5 font-medium text-slate-900 dark:bg-slate-800 dark:text-slate-200">
        <Link
          className={`${page === "login" ? "bg-white" : ""} rounded-sm px-3 py-1.5`}
          href="/login"
        >
          Log in
        </Link>
        <Link
          className={`${page === "register" ? "bg-white" : ""} rounded-sm px-3 py-1.5`}
          href="/register"
        >
          Register
        </Link>
      </ul>
      {children}
    </div>
  );
}
