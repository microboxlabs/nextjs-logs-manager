"use client";

import Heading from "@/app/components/Heading";
import { Button } from "flowbite-react";

export default function LogViewPageError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Heading>Something went wrong</Heading>
      <Button pill onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
