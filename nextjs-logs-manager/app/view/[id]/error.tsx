"use client";

import Heading from "@/app/components/Heading";
import { Button } from "flowbite-react";

export default function LogViewPageError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Heading>Algo sali&oacute; mal</Heading>
      <Button pill onClick={() => reset()}>
        Intentar de nuevo
      </Button>
    </div>
  );
}
