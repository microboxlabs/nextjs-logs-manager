"use client";

import FromDateFilter from "@/src/components/dashboard/filtering/FromDateFilter";
import ToDateFilter from "@/src/components/dashboard/filtering/ToDateFilter";
import LogLevelFilter from "@/src/components/dashboard/filtering/LogLevelFilter";
import ServiceNameFilter from "@/src/components/dashboard/filtering/ServiceNameFilter";

export default function Filters() {
  return (
    <ul
      className="grid w-full gap-[clamp(1rem,4px,2rem)] rounded-xl bg-white px-[clamp(10px,2vw,2rem)] py-[clamp(8px,2vh,4rem)] text-slate-900 dark:bg-slate-900 dark:text-white sm:grid-cols-2"
      style={{
        gridAutoFlow: "dense",
        gridAutoRows: "max-content",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 250px), 1fr))",
      }}
    >
      <li>
        <FromDateFilter />
      </li>
      <li>
        <ToDateFilter />
      </li>
      <li>
        <LogLevelFilter />
      </li>
      <li>
        <ServiceNameFilter />
      </li>
    </ul>
  );
}
