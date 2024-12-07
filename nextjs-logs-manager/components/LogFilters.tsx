"use client";

import { useFilters } from "@/contexts/FilterContext";
import { TextInput, Select, Button, Card } from "flowbite-react";

export default function LogFilters() {
  const { filters, setFilters } = useFilters();

  return (
    <Card>
      <h2 className="mb-2 text-xl font-semibold">Filters</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <TextInput
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, startDate: e.target.value }))
            }
            placeholder="Start Date"
          />
        </div>
        <div>
          <TextInput
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, endDate: e.target.value }))
            }
            placeholder="End Date"
          />
        </div>
        <div>
          <Select
            value={filters.logLevel}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, logLevel: e.target.value }))
            }
          >
            <option value="">Select Log Level</option>
            <option value="INFO">INFO</option>
            <option value="WARNING">WARNING</option>
            <option value="ERROR">ERROR</option>
          </Select>
        </div>
        <div>
          <TextInput
            type="text"
            value={filters.serviceName}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, serviceName: e.target.value }))
            }
            placeholder="Service Name"
          />
        </div>
      </div>
    </Card>
  );
}
