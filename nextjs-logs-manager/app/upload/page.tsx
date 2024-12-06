"use client";

import { TextInput, Button } from "flowbite-react";
import { useState } from "react";
import { useRole } from "@/lib/hooks/useRole";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const isAdmin = useRole("admin");
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("fileContent", await file.text());

    const response = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ fileContent: await file.text() }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setUploadStatus("File uploaded successfully!");
      setFile(null);
    } else {
      setUploadStatus("Failed to upload the file. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto h-screen p-4 dark:bg-gray-800">
        <h1 className="mb-4 text-2xl font-bold dark:text-white">Upload Logs</h1>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <TextInput
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400"
          />
          <Button
            type="submit"
            className=" bg-blue-500 text-white hover:bg-blue-600"
          >
            Upload
          </Button>
        </form>
        {uploadStatus && (
          <p className="mt-4 text-sm text-gray-700">{uploadStatus}</p>
        )}
      </main>
    </>
  );
};

export default UploadPage;
