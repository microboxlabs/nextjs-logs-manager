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
    setFilters((prev) => ({ ...prev, [name]: value.trim().toLowerCase() }));
  };

  // Envía los filtros al componente padre
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 p-4 items-center">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <Label htmlFor={field.name}>{field.label}</Label>
          {field.type === "select" ? (
            <Select
            id={field.name}
            value={filters[field.name!]}
            onChange={(e) => handleChange(field.name!, e.target.value)}
          >
            <option value="">Todos</option> {/* Este valor será vacío */}
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          ) : (
            <TextInput
              id={field.name}
              value={filters[field.name!]} // Valor actual del filtro
              placeholder={`Buscar ${field.label}`}
              onChange={(e) => handleChange(field.name!, e.target.value)}
            />
          )}
        </div>
      ))}
      <Button type="submit">Filtrar</Button>
    </form>
  );
}