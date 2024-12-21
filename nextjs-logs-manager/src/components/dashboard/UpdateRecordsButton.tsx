"use client";

import useFilterStore from "@/src/hooks/use-log-filters";
import { useToast } from "@/src/hooks/use-toast";
import useLogRecordsStore from "@/src/hooks/use-log-records-store";
import fetchLogs from "@/src/components/dashboard/fetchLogs";
import { Button } from "@/src/components/ui/button";

export default function UpdateRecordsButton() {
  const { filters } = useFilterStore();
  const { toast } = useToast();
  const store = useLogRecordsStore();
  const onClick = async () => {
    const result = await fetchLogs({ filters });
    if (result.type === "error") {
      toast({
        title: "Couldn't fetch your logs",
        description: result.message,
        variant: "destructive",
      });
      return;
    }
    store.setRecords(result.records);
  };
  return (
    <Button variant={"outline"} onClick={onClick}>
      Update records
    </Button>
  );
}
