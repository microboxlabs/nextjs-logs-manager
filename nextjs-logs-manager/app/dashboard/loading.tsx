"use client";
import { Button, Table } from "flowbite-react";

// Define the skeleton component
function LoadingSkeleton() {
  return (
    <div className="mx-auto max-h-screen min-h-screen p-4 dark:bg-gray-800">
      <div className="flex flex-row gap-2">
        <div className="h-8 animate-pulse bg-gray-200"></div>
        <div className="h-8 animate-pulse bg-gray-200"></div>
        <div className="h-8 animate-pulse bg-gray-200"></div>
        <div className="h-8 animate-pulse bg-gray-200"></div>
        <div className="h-8 animate-pulse bg-gray-200"></div>
      </div>
      <div className="relative overflow-x-auto sm:rounded-sm">
        <Table className="min-w-full border-collapse border border-gray-200">
          <Table.Head className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <Table.HeadCell className="border border-gray-300 p-2">
              Timestamp
            </Table.HeadCell>
            <Table.HeadCell className="border border-gray-300 p-2">
              Level
            </Table.HeadCell>
            <Table.HeadCell className="border border-gray-300 p-2">
              Service
            </Table.HeadCell>
            <Table.HeadCell className="border border-gray-300 p-2">
              Message
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {/* Render skeleton rows */}
            {[1, 2, 3].map((index) => (
              <Table.Row key={index}>
                <Table.Cell className="border border-gray-300 p-2">
                  <div className="h-4 animate-pulse bg-gray-200"></div>
                </Table.Cell>
                <Table.Cell className="border border-gray-300 p-2">
                  <div className="h-4 animate-pulse bg-gray-200"></div>
                </Table.Cell>
                <Table.Cell className="border border-gray-300 p-2">
                  <div className="h-4 animate-pulse bg-gray-200"></div>
                </Table.Cell>
                <Table.Cell className="border border-gray-300 p-2">
                  <div className="h-4 animate-pulse bg-gray-200"></div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className="my-2 flex items-center justify-center space-x-2">
          {/* Render skeleton buttons */}
          <Button className="animate-pulse rounded bg-gray-300 text-gray-700 hover:bg-gray-400">
            Previous
          </Button>
          {[1, 2, 3].map((pageNumber) => (
            <Button
              key={pageNumber}
              className="animate-pulse rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
            >
              {pageNumber}
            </Button>
          ))}
          <Button className="animate-pulse rounded bg-gray-300 text-gray-700 hover:bg-gray-400">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
