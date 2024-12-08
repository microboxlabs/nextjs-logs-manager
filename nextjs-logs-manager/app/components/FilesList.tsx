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
    <ul className="divide-y divide-gray-200 py-8">
      {files.map((up) => (
        <li key={generateId()} className="py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {up.file.name}
              </p>
              <p className="truncate text-sm text-gray-500">
                {`${up.file.size} bytes`}
              </p>
            </div>
            <div className="inline-flex items-center">
              <button onClick={onRemove.bind(null, up.id)} className="">
                <svg
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
