"use client";

import { List, Button } from "flowbite-react";
import { FiFileText } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

import { generateId } from "@/app/shared/utils";
import type { TUploadedFile } from "./LogsForm";

type Props = {
  files?: TUploadedFile[];
  onRemove: (id: string) => void;
};

export default function FilesList({ files, onRemove }: Props) {
  if (!files || files.length === 0) {
    return null;
  }

  return (
    <List className="divide-y divide-gray-200 py-8" unstyled>
      {files.map((up) => (
        <List.Item key={generateId()} className="py-4">
          <div className="flex items-center space-x-4">
            <FiFileText className="size-7" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {up.file.name}
              </p>
              <p className="truncate text-sm text-gray-500">
                {`${up.file.size} bytes`}
              </p>
            </div>
            <div className="inline-flex items-center">
              <Button onClick={onRemove.bind(null, up.id)} pill color="gray">
                <FaRegTrashAlt className="text-red-500" />
              </Button>
            </div>
          </div>
        </List.Item>
      ))}
    </List>
  );
}
