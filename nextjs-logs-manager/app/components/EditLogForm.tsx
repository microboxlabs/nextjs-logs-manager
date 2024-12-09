"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Datepicker, TextInput, Label, Button, Select } from "flowbite-react";

import type { TLog } from "@/app/shared/types";
import Heading from "./Heading";
import ErrorMessage from "./ErrorMessage";

export default function EditLogForm({ log }: { log?: TLog }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TLog>({
    defaultValues: { ...log },
  });
  const [isEditing, setIsEditing] = useState(false);

  const submit = async (data: TLog) => {
    setIsEditing(false);

    try {
      await axios.put("/api/manage-logs", data);
      alert("Registro actualizado exitosamente");
    } catch (error) {
      alert("Algo salió mal");
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <header className="mb-4 flex flex-col gap-6 sm:mb-8 sm:flex-row sm:justify-between">
        <Heading className="text-teal-700">{`Registro #${log!.id}`}</Heading>
        {isEditing ? (
          <Button type="submit" color="success" pill>
            Guardar cambios
          </Button>
        ) : (
          <Button type="button" onClick={handleEdit} pill>
            Editar
          </Button>
        )}
      </header>

      <div className="max-w-screen-sm">
        <div className="flex flex-col sm:flex-row sm:gap-8">
          <div className="mb-6">
            <Label htmlFor="date">Fecha</Label>
            <Controller
              control={control}
              name="date"
              rules={{ required: "Campo fecha requerido" }}
              render={({ field: { value, onChange } }) => (
                <Datepicker
                  id="date"
                  language="es-MX"
                  disabled={!isEditing}
                  // TODO: Fix input binding
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors && errors.date && (
              <ErrorMessage>{errors.date.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-6">
            <Label htmlFor="time">Hora:</Label>
            <Controller
              control={control}
              name="time"
              rules={{ required: "Campo tiempo requerido" }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  type="time"
                  disabled={!isEditing}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors && errors.time && (
              <ErrorMessage>{errors.time.message}</ErrorMessage>
            )}
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="level">Nivel</Label>
          <Controller
            control={control}
            name="level"
            rules={{ required: "Campo nivel requerido" }}
            render={({ field: { value, onChange } }) => (
              <Select disabled={!isEditing} value={value} onChange={onChange}>
                <option value="INFO">INFO</option>
                <option value="ERROR">ERROR</option>
                <option value="WARNING">WARNING</option>
              </Select>
            )}
          />
          {errors && errors.level && (
            <ErrorMessage>{errors.level.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-6">
          <Label htmlFor="serviceName">Nombre del servicio</Label>
          <Controller
            control={control}
            name="serviceName"
            rules={{
              required: "Campo nombre del servicio requerido",
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                disabled={!isEditing}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors && errors.serviceName && (
            <ErrorMessage>{errors.serviceName.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-6">
          <Label htmlFor="message">Mensaje</Label>
          <Controller
            control={control}
            name="message"
            rules={{ required: "Mensaje requerido" }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                disabled={!isEditing}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors && errors.message && (
            <ErrorMessage>{errors.message.message}</ErrorMessage>
          )}
        </div>
      </div>
    </form>
  );
}
