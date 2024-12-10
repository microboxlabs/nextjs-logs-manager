"use client";

import { FormEvent, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Button } from "flowbite-react";

import FilesList from "./FilesList";
import { generateId } from "@/app/shared/utils";
import ErrorMessage from "./ErrorMessage";

export type TUploadedFile = {
  id: string;
  file: File;
};

export default function LogForm() {
  const formRef = useRef(null);
  const { push } = useRouter();
  const [isRequiredError, setIsRequiredError] = useState(false);
  const [files, setFiles] = useState<TUploadedFile[]>([]);

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
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("logFiles", files[i].file);
      }

      await axios.post("/api/manage-logs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      push("/");
    } catch (error) {
      alert("Error while uploading logs");
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
                  className="mb-4 size-8 text-gray-500"
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
                  <span className="font-semibold">Click here to upload</span> or
                  drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">.TXT</p>
              </div>
            ) : (
              <p>Drop here</p>
            )}
          </div>
        </label>
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        For correct processing, the records in the file must be in the following
        format: <br />
        [2024-11-01 10:00:00] [INFO] Service-A: Successfully completed task.{" "}
        <br />
        [2024-11-01 10:01:00] [ERROR] Service-B: Failed to connect to the
        database. <br />
      </p>
      {isRequiredError && (
        <ErrorMessage>At least one file required</ErrorMessage>
      )}
      <FilesList files={files} onRemove={removeFile} />
      <div className="mt-8 flex flex-col sm:flex-row sm:justify-end">
        <Button type="submit" pill color="success">
          Upload logs
        </Button>
      </div>
    </form>
  );
}
