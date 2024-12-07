"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import type { TLog } from "@/shared/types";

export default function EditLogForm({ log }: { log?: TLog }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLog>({
    defaultValues: { ...log },
  });
  const [isEditing, setIsEditing] = useState(false);

  const submit = (data: TLog) => {
    setIsEditing(false);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      {isEditing ? (
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Guardar cambios
        </button>
      ) : (
        <button
          type="button"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          onClick={handleEdit}
        >
          Editar
        </button>
      )}
      <div className="mb-6">
        <label
          htmlFor="date"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Fecha
        </label>
        <div className="relative max-w-sm">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            id="date"
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            {...register("date", { required: "Campo fecha requerido" })}
            disabled={!isEditing}
          />
        </div>

        {errors && errors.date && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.date.message}
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="time"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Hora:
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 end-0 top-0 flex items-center pe-3.5">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
            type="time"
            id="time"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            {...register("time", { required: "Campo tiempo requerido" })}
            disabled={!isEditing}
          />
        </div>

        {errors && errors.time && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.time.message}
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="logLevel"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Nivel
        </label>
        <input
          id="logLevel"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          {...register("level", { required: "Campo nivel requerido" })}
          disabled={!isEditing}
        />

        {errors && errors.level && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.level.message}
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="serviceName"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Nombre del servicio
        </label>
        <input
          id="serviceName"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          {...register("serviceName", {
            required: "Campo nombre del servicio requerido",
          })}
          disabled={!isEditing}
        />

        {errors && errors.serviceName && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.serviceName.message}
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Mensaje
        </label>
        <input
          id="message"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          {...register("message", { required: "Mensaje requerido" })}
          disabled={!isEditing}
        />

        {errors && errors.message && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>
    </form>
  );
}
