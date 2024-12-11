"use client";
import Logo from "@/components/Logo";
import LogTable from "@/components/Logs/LogTable";
import LogUploadForm from "@/components/Logs/LogUploadForm";
import { Log } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/types/api";

export default function Home() {
  const session = useSession();

  const [page, setPage] = useState(1);
  const [levelFilter, setLevelFilter] = useState<string[]>([]);
  const [serviceFilter, setServiceFilter] = useState<string[]>([]);
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");

  useEffect(() => {
    if (session.status === "unauthenticated") {
      redirect("/auth/signin");
    }
  }, [session]);

  const {
    data: {
      data: { logs, pagination, services },
    },
    isLoading,
  } = useQuery<
    ApiResponse<{ logs: Log[]; pagination: any; services: string[] }>
  >({
    queryKey: [
      "logs",
      page,
      levelFilter,
      serviceFilter,
      startDateFilter,
      endDateFilter,
    ],
    queryFn: () => {
      return axios
        .get(
          `/api/logs?page=${page}?logLevel=${levelFilter}&serviceName=${serviceFilter}&startDate=${startDateFilter}&endDate=${endDateFilter}`,
        )
        .then((res) => res.data);
    },
    retry: false,
    enabled: session.status === "authenticated",
    initialData: {
      success: false,
      error: false,
      message: "Waiting for data...",
      data: {
        logs: [],
        pagination: null,
        services: [],
      },
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 dark:bg-gray-800">
      <Logo className="text-3xl" text="s" />

      <div className="flex flex-wrap justify-center gap-6">
        {!isLoading && logs.length > 0 && pagination && (
          <LogTable
            pagination={pagination}
            logs={logs}
            onPageChange={function (page: number): void {
              setPage(page);
            }}
            services={services}
            setLevelFilter={setLevelFilter}
            setServiceFilter={setServiceFilter}
            setStartDateFilter={setStartDateFilter}
            setEndDateFilter={setEndDateFilter}
          />
        )}

        {session.status != "loading" ? (
          <LogUploadForm
            onUploadSuccess={() => {
              setPage(1);
            }}
          />
        ) : null}
      </div>

      <Link
        className="text-white underline drop-shadow-lg"
        href="/auth/signout"
      >
        Log out
      </Link>
    </main>
  );
}
