import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import useFilterStore from "@/src/hooks/use-log-filters";
import { useEffect } from "react";
import { useToast } from "@/src/hooks/use-toast";
import { format } from "date-fns";
import fetchLogs from "@/src/components/dashboard/fetchLogs";
import useLogRecordsStore from "@/src/hooks/use-log-records-store";

export default function LogTable() {
  const { filters } = useFilterStore();

  const { toast } = useToast();
  const store = useLogRecordsStore();
  const rows = store.records.slice((store.page - 1) * 10, store.page * 10);

  useEffect(() => {
    fetchLogs({ filters }).then((result) => {
      if (result.type === "error") {
        toast({
          title: "Couldn't fetch your logs",
          description: result.message,
          variant: "destructive",
        });
        return;
      }
      store.setRecords(result.records);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
      <div className="w-full overflow-x-auto">
        <Table className="min-w-full">
          <TableCaption>A list of your recent logs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Timestamp</TableHead>
              <TableHead className="whitespace-nowrap">Level</TableHead>
              <TableHead className="whitespace-nowrap">Service</TableHead>
              <TableHead className="whitespace-nowrap">Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((record, index) => (
                <TableRow key={`record-${index}`}>
                  <TableCell className="whitespace-nowrap" key={`record-${index}-cell-timestamp`}>
                    {format(record.timestamp, "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell className="whitespace-nowrap" key={`record-${index}-cell-level`}>
                    {record.level}
                  </TableCell>
                  <TableCell className="whitespace-nowrap" key={`record-${index}-cell-service`}>
                    {record.service}
                  </TableCell>
                  <TableCell className="whitespace-nowrap" key={`record-${index}-cell-message`}>
                    {record.message}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  );
}
