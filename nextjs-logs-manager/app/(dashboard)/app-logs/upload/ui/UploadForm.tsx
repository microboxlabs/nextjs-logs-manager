'use client';

import { useForm } from "react-hook-form";
import { useState } from "react";
import { uploadLogs } from "@/actions";

type FormInputs = {
  logFile: FileList;
};

export default function UploadForm() {
  const [status, setStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>();

  async function onSubmit(data: FormInputs) {
    try {
      const formData = new FormData();
      formData.append("logFile", data.logFile[0]);

      const result = await uploadLogs(formData);
      setStatus(result);

      if (result.success) {
        reset();
      }
    } catch (error) {
      setStatus({
        success: false,
        message: "Failed to upload logs",
      });
    }
  }

  return (
    <div className="w-[500px] overflow-hidden rounded-lg bg-white shadow-md">
      <div className="border border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">Subir logs</h3>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="logFile"
              className="block text-sm font-medium text-gray-700"
            >
              Seleccione el archivo
            </label>

            <input
              id="logFile"
              type="file"
              accept=".txt,.log"
              {...register("logFile", {
                required: "Log file is required",
                validate: {
                  acceptedFormats: (files) => {
                    if (!files[0]) return true;
                    const file = files[0];
                    const validTypes = ["text/plain", "application/log"];
                    return (
                      validTypes.includes(file.type) ||
                      "Only .txt or .log files are allowed"
                    );
                  },
                  maxSize: (files) => {
                    if (!files[0]) return true;
                    const maxSize = 5 * 1024 * 1024; // 5MB
                    return (
                      files[0].size <= maxSize ||
                      "File size must be less than 5MB"
                    );
                  },
                },
              })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 
                         file:mr-4 file:border-0 file:bg-gray-50 file:px-4 
                         file:py-2 file:text-sm file:font-medium 
                         file:text-gray-700 hover:file:bg-gray-100"
            />

            {errors.logFile && (
              <p className="mt-1 text-sm text-red-600">
                {errors.logFile.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? "Uploading..." : "Upload Logs"}
          </button>

          {status.message && (
            <div
              className={`rounded-md p-4 ${
                status.success
                  ? "border border-green-200 bg-green-50 text-green-700"
                  : "border border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
