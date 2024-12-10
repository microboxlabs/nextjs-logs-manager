import { Table, Pagination } from "flowbite-react";
import type { Entry } from "@prisma/client";

type Props = {
  entries?: Entry[];
  pagination: {
    page: number;
    perPage: number;
    totalPages: number;
    totalCount: number;
  };
  onPageChange: (page: number) => void;
};

export default function EntriesTable({
  entries,
  pagination,
  onPageChange,
}: Props) {
  if (!entries) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Id</Table.HeadCell>
          <Table.HeadCell>User</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Details</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {entries?.map((entry) => (
            <Table.Row key={entry.id} className="bg-white">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                {entry.id}
              </Table.Cell>
              <Table.Cell>{entry.user}</Table.Cell>
              <Table.Cell>{entry.date}</Table.Cell>
              <Table.Cell>{entry.details}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
