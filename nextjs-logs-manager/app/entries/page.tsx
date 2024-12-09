"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import EntriesTable from "../components/EntriesTable";
import Heading from "../components/Heading";
import type { TEntry, TPaginatedEntriesResponse } from "../shared/types";
import Spinner from "../components/Spinner";

export default function Entries() {
  const [entries, setEntries] = useState<TEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 1,
    totalPages: 1,
    totalCount: 1,
  });

  const fetchEntries = useCallback(() => {
    axios
      .get<TPaginatedEntriesResponse>("/api/manage-entries", {
        params: { page: pagination.page },
      })
      .then((res) => {
        setEntries(res.data.data);
        setIsLoading(false);
        setPagination((s) => ({
          ...s,
          page: res.data.pagination.page,
          perPage: res.data.pagination.perPage,
          totalPages: res.data.pagination.totalPages,
          totalCount: res.data.pagination.totalCount,
        }));
      });
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
      <Heading className="mb-8">Subidas</Heading>
      <EntriesTable
        entries={entries}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </>
  );
}
