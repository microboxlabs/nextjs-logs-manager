import { Label } from "@/src/components/ui/label";
import useFilterStore from "@/src/hooks/use-log-filters";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import LogLevel from "@/src/modules/records/domain/LogLevel";

export default function LogLevelFilter() {
  const { update } = useFilterStore();

  return (
    <div className="flex w-fit flex-row items-center justify-center gap-[clamp(1rem,4px,2rem)] rounded-2xl bg-white  dark:bg-slate-900">
      <Label className="min-w-fit  max-w-16 ">Log level</Label>
      <Select
        onValueChange={(value) =>
          update("level", value === "none" ? undefined : (value as LogLevel))
        }
      >
        <SelectTrigger className="w-[180px]" data-testid="log-level-filter">
          <SelectValue placeholder="All levels" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="none">All levels</SelectItem>
            <SelectItem value={LogLevel.INFO}>INFO</SelectItem>
            <SelectItem value={LogLevel.WARNING}>WARNING</SelectItem>
            <SelectItem value={LogLevel.ERROR}>ERROR</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
