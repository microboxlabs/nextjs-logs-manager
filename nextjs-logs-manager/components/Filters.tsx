"use client";

import { Button, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";

type FilterFormProps = {
  onFilter: (filters: Record<string, string>) => void;
};

const FilterForm: React.FC<FilterFormProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-2">
      <TextInput
        type="date"
        name="startDate"
        onChange={handleChange}
        className="w-40"
        aria-label="Start Date"
        min="2020-01-01"
        max={new Date().toISOString().split("T")[0]}
        required
      />
      <TextInput
        type="date"
        name="endDate"
        onChange={handleChange}
        className=" "
      />
      <Select name="level" onChange={handleChange} className="">
        <option value="">All Levels</option>
        <option value="INFO">INFO</option>
        <option value="WARNING">WARNING</option>
        <option value="ERROR">ERROR</option>
      </Select>
      <TextInput
        type="text"
        name="service"
        placeholder="Service Name"
        onChange={handleChange}
        className=""
      />
      <Button type="submit" className=" bg-blue-500 hover:bg-blue-600">
        Apply Filters
      </Button>
    </form>
  );
};

export default FilterForm;
