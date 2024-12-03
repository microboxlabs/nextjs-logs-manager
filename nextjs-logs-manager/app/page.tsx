"use client";

import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  Pagination,
} from "flowbite-react";
import DashboardElement from "./components/dashboard_elements";
import Filters from "./components/filters_form";
import { Key, useEffect, useState } from "react";
import { GetLogs } from "./actions";
import toast, { Toaster } from "react-hot-toast";
import { list } from "postcss";

export interface Filter {
  typeId?: number;
  service?: string;
  from?: Date;
  to?: Date;
}

// this is the home, here i will display data based on the state of the user
export default function Home() {
  const [filter, setFilter] = useState<Filter | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [lists, setLists] = useState<{
    types: { id: number; name: string }[];
    service_names: { service: string }[];
    logs: {
      service: string;
      id: Key | null | undefined;
      datetime: Date;
      type: { name: string };
      message: string;
    }[];
    logs_count: number;
  }>({ types: [], service_names: [], logs: [], logs_count: 0 });

  const page_size = 7;
  const onPageChange = (page: number) => setPage(page);

  useEffect(() => {
    const loadingToastId = toast.loading("Loading data...");
    const loadData = async () => {
      try {
        const data = await GetLogs({ filters: filter }, page, page_size);
        setLists(data);

        setPageCount(Math.ceil(data.logs_count / page_size));
        toast.success("Data loaded successfully!", { id: loadingToastId });

        // i did this so it dont scrolls down once the whole table loads
        window.scrollTo(0, 0);
      } catch (error) {
        toast.error("Failed to load data. Please try again.", {
          id: loadingToastId,
        });
      }
    };

    loadData();
  }, [filter, page]);

  return (
    <main className="flex grow justify-center gap-2 overflow-auto dark:bg-gray-800">
      <Toaster />
      <div className="mx-2 my-10 overflow-x-auto">
        <form className="w-full">
          <Filters
            types={lists.types}
            services={lists.service_names}
            setFilter={setFilter}
          />
        </form>

        <div className=" overflow-x-auto">
          <Table striped>
            <TableHead>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Time</TableHeadCell>
              <TableHeadCell>Type</TableHeadCell>
              <TableHeadCell>Service name</TableHeadCell>
              <TableHeadCell>Message</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {lists.logs.map((element) => {
                return (
                  <DashboardElement
                    key={element.id}
                    datetime={element.datetime}
                    type={element.type.name}
                    service_name={element.service}
                    message={element.message}
                  />
                );
              })}
            </TableBody>
          </Table>
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              currentPage={page}
              totalPages={pageCount}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
