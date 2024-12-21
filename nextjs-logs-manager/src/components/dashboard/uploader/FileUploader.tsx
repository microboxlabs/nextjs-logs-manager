"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/src/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";

import UploadStatus from "../UploadStatus";
import nextConfig from "@/next.config.mjs";

const FileUploader = () => {
  const { toast } = useToast();
  const [status, setStatus] = useState<UploadStatus>({ type: "idle" });

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(() => ({ type: "loading" }));
    if (!event.target?.files || event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    if (file.type !== "text/plain") {
      toast({
        title: "Invalid file type",
        description: "Only .txt files are allowed",
        variant: "destructive",
      });
      return;
    }
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target?.result?.toString();
      if (!text) {
        return;
      }

      const fileLines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      setStatus(() => ({ type: "waiting to upload", lines: fileLines }));
      return;
    };

    reader.readAsText(file);
  };

  useEffect(() => {
    if (status.type === "success") {
      toast({
        title: "Logs uploaded successfully",
        description: "You can now see them in the dashboard",
        variant: "default",
      });
      setStatus(() => ({ type: "idle" }));
      return;
    }
    if (status.type === "error") {
      toast({
        title: "Couldn't upload logs",
        description:
          status.type === "error" ? status.message : "Please try again later",
        variant: "destructive",
      });
      return;
    }

    if (status.type === "waiting to upload") {
      const url = `${nextConfig.env.API_URL}/api/records`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rawRecords: status.lines,
        }),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setStatus(() => ({ type: "success" }));
            return;
          }
          setStatus(() => ({
            type: "error",
            message: data.error,
            unsaved: data.unsaved,
          }));
          return;
        })
        .catch((err) => {
          setStatus(() => ({
            type: "error",
            message: err.message,
            unsaved: [],
          }));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.type]);

  return (
    <div className="flex flex-col items-center p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Upload</Button>
        </DialogTrigger>
        <DialogContent className="w-auto gap-[clamp(4px,2vh,4rem)] rounded-lg bg-white px-[clamp(10px,2vw,10rem)] py-[clamp(8px,2vh,8rem)] dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle>Upload you log file</DialogTitle>
            <DialogDescription>
              For now only txt files are accepted
            </DialogDescription>
          </DialogHeader>

          <div className="flex w-full items-center justify-center  rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
            <label
              htmlFor="dropzone-file"
              className="flex w-full flex-col items-center gap-1.5 rounded-lg bg-white p-[clamp(8px,2vh,8rem)] dark:bg-slate-900"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 size-8 text-gray-500 dark:text-gray-400"
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Only .txt files are accepted
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept=".txt"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          <DialogFooter>
            {status.type === "waiting to upload" && (
              <span className="text-sm text-muted-foreground">
                You are about to upload {status.lines.length} logs
              </span>
            )}
            {status.type === "loading" && <Loader2 className="size-8" />}
            {status.type === "error" && (status.unsaved ?? []).length > 0 && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Logs that could not be uploaded
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-inside list-disc">
                      {(status.unsaved ?? []).map(({ raw, error }, index) => (
                        <li key={index}>
                          <p>raw: {raw}</p>
                          <p className="text-red-500">{error}</p>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileUploader;
