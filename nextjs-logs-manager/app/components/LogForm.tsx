"use client";

import { FormEvent, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import FilesList from "./FilesList";
import { generateId } from "@/app/shared/utils";

export type TUploadedFile = {
  id: string;
  file: File;
};

export default function LogForm() {
  const formRef = useRef(null);
  const { push } = useRouter();
  const [isRequiredError, setIsRequiredError] = useState(false);
  const [files, setFiles] = useState<TUploadedFile[]>();

  const onDrop = useCallback((files: File[]) => {
    setFiles((prevFiles) => {
      const convertedFiles = files.map((f) => ({ id: generateId(), file: f }));

      if (prevFiles && prevFiles.length !== 0) {
        return [...prevFiles, ...convertedFiles];
      }
      return convertedFiles;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 3,
    accept: { "text/plain": [".txt"] },
  });

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      setIsRequiredError(true);
      return;
    } else {
      setIsRequiredError(false);
    }

    try {
      const formData = new FormData(formRef.current!);
      await axios.post("/api/manage-logs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      push("/");
    } catch (error) {
      alert("Error subiendo registros");
    }
  };

  const removeFile = (id: string) => {
    setFiles((files) => files?.filter((f) => f.id !== id));
  };

  return (
    <form onSubmit={submit} ref={formRef}>
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-800"
          {...getRootProps()}
        >
          <div>
            <input name="logFiles" {...getInputProps()} />
            {!isDragActive ? (
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click para subir</span> o
                  arrastre y suelte
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">.TXT</p>
              </div>
            ) : (
              <p>Suelte aqu&iacute;</p>
            )}
          </div>
        </label>
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Para un correcto procesamiento, los registros en el archivo deben estar
        en el siguiente formato: <br />
        [2024-11-01 10:00:00] [INFO] Service-A: Successfully completed task.{" "}
        <br />
        [2024-11-01 10:01:00] [ERROR] Service-B: Failed to connect to the
        database. <br />
      </p>
      {isRequiredError && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          Al menos un archivo es requerido
        </p>
      )}
      <FilesList files={files} onRemove={removeFile} />
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
      >
        Subir registros
      </button>
    </form>
  );
}
