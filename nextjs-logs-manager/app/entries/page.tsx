"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Spinner } from "flowbite-react";
import type { Entry } from "@prisma/client";

import EntriesTable from "../components/EntriesTable";
import Heading from "../components/Heading";
import type { TPaginatedEntriesResponse } from "../shared/types";

// It's an extra
export default function Entries() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 1,
    totalPages: 1,
    totalCount: 1,
  });

  const fetchEntries = useCallback(async () => {
    const res = await axios.get<TPaginatedEntriesResponse>(
      "/api/manage-entries",
      {
        params: { page: pagination.page },
      },
    );

    setEntries(res.data.data);
    setIsLoading(false);
    setPagination((s) => ({
      ...s,
      page: res.data.pagination.page,
      perPage: res.data.pagination.perPage,
      totalPages: res.data.pagination.totalPages,
      totalCount: res.data.pagination.totalCount,
    }));
  }, [pagination.page]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  if (isLoading) {
    return (
      <div className="grid h-[400px] place-items-center">
        <Spinner />
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    setPagination((s) => ({ ...s, page }));
  };

  return (
    <>
      <Heading className="mb-8">Entries</Heading>
      <EntriesTable
        entries={entries}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </>
  );
}
