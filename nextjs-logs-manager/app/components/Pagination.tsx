import classNames from "classnames";
import { generateId } from "../shared/utils";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <nav className="mt-8 flex justify-center">
      <ul className="inline-flex h-10 -space-x-px text-base">
        <li>
          <button
            type="button"
            className="ms-0 flex h-10 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Anterior
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={generateId()}>
            <button
              type="button"
              className={classNames(
                "flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight  hover:bg-gray-100 hover:text-gray-700",
                { "text-blue-700": currentPage === i + 1 },
                { "text-gray-500": currentPage !== i + 1 },
              )}
              disabled={currentPage === i + 1}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            className="flex h-10 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
}
