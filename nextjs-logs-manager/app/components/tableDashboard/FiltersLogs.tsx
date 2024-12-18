'use client';
import { useState } from "react";
import { Button, Select, TextInput, Label } from "flowbite-react";

interface FilterField {
    name: string;
    label: string;
    type: "select" | "text";
    options?: string[]; // Opciones solo si es `select`
  }

interface FiltersLogsProps {
  fields: FilterField[]; // Configuración de los filtros
  onFilterChange: (criteria: Record<string, string>) => void;
}

export default function FiltersLogs({ fields, onFilterChange }: FiltersLogsProps) {
  // Inicializa los filtros con valores vacíos para cada campo
  const initialFilters = fields.reduce((acc, field) => {
    acc[field.name!] = "";
    return acc;
  }, {} as Record<string, string>);

  const [filters, setFilters] = useState<Record<string, string>>(initialFilters);

  // Manejar cambios en los inputs
  const handleChange = (name: string, value: string) => {
    // Actualiza el estado del filtro localmente
    setFilters((prev) => ({ ...prev, [name]: value })); // Elimina el .trim().toLowerCase()
  };

  // Envía los filtros al componente padre
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Enviar todos los filtros al componente padre, incluso los vacíos
    onFilterChange(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-6 p-4 w-full md:flex-row md:items-center md:gap-4"
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col w-full md:w-auto">
          <Label
            htmlFor={field.name}
            className="mb-2 text-sm font-medium text-gray-700"
          >
            {field.label}
          </Label>
          {field.type === "select" ? (
            <Select
              id={field.name}
              value={filters[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="">Todos</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          ) : (
            <TextInput
              id={field.name}
              value={filters[field.name]}
              placeholder={`Buscar ${field.label}`}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          )}
        </div>
      ))}
      <div className="flex justify-end items-end md:justify-start w-full md:w-auto">
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
          Filtrar
        </Button>
      </div>
    </form>
  );
}