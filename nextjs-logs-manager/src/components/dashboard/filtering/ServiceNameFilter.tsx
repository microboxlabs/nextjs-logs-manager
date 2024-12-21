import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import useFilterStore from "@/src/hooks/use-log-filters";

export default function ServiceNameFilter() {
  const { update } = useFilterStore();

  return (
    <div className="flex w-fit flex-row items-center justify-center gap-[clamp(1rem,4px,2rem)] rounded-2xl bg-white  dark:bg-slate-900">
      <Label htmlFor="service" className="min-w-fit  max-w-16 ">
        Service
      </Label>
      <Input
        type="text"
        id="service"
        placeholder="Enter a name"
        onChange={(e) => update("service", e.target.value)}
      />
    </div>
  );
}
