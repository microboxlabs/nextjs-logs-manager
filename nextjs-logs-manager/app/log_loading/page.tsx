"use client";

import { useState } from "react";
import { Button, FileInput, Label } from "flowbite-react";
import { DataUpload } from "./actions";
import toast, { Toaster } from "react-hot-toast";

interface Notification {
  type: string;
  message: string;
}

const Main = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget); // Create FormData from the form
    const response = DataUpload(formData);

    toast.promise(
      response,
      {
        loading: "Saving...",
        success: (data) => <b>{data.message}</b>,
        error: (error) => <b>{error.message}</b>,
      },
      {
        style: {
          minWidth: "250px",
        },
      },
    );
  };

  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div className="mb-2 block">
          <Label htmlFor="file-upload" value="Upload log file" />
        </div>
        <FileInput id="file-upload" name="file" />
        <Button type="submit">Upload</Button>
      </form>
      <Toaster position="bottom-center" reverseOrder={false} />
    </main>
  );
};

export default Main;
