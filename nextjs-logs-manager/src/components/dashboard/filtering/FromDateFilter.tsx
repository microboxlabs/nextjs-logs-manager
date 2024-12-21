import { Label } from "@/src/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/src/components/ui/calendar";
import useFilterStore from "@/src/hooks/use-log-filters";

export default function FromDateFilter() {
  const { filters, update } = useFilterStore();

  return (
    <div className="flex w-fit flex-row items-center justify-center gap-[clamp(1rem,4px,2rem)] rounded-2xl bg-white  dark:bg-slate-900">
      <Label className="min-w-fit  max-w-16 ">From date</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !filters.from && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {filters.from ? (
              format(filters.from, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={filters.from}
            onSelect={(date) => update("from", date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
