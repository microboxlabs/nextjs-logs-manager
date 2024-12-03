"use client";

import { Table, TableHead, TableHeadCell, TableBody } from "flowbite-react";
import DashboardElement from "./components/dashboard_elements";
import Filters from "./components/filters_form";
import { Key, useEffect, useState } from "react";
import { GetLogs } from "./actions";
import toast, { Toaster } from "react-hot-toast";

export interface Filter {
  typeId?: number;
  service?: string;
  from?: Date;
  to?: Date;
}

// this is the home, here i will display data based on the state of the user
export default function Home() {
  const [filter, setFilter] = useState<Filter | undefined>(undefined);
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
  }>({ types: [], service_names: [], logs: [] });

  useEffect(() => {
    const loadingToastId = toast.loading("Loading data...");
    const loadData = async () => {
      try {
        const data = await GetLogs({ filters: filter });
        setLists(data);
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
  }, [filter]);

  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
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
        </div>
      </div>
    </main>
  );
}
