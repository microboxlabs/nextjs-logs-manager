'use client'
import { Pagination } from "flowbite-react";

interface PaginationsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginations = ({ currentPage, totalPages, onPageChange }: PaginationsProps) => {
  return (
    <div className="flex overflow-x-auto sm:justify-center p-4">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
};

export default Paginations;