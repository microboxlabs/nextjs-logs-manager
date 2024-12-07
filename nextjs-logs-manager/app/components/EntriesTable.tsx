import { TEntry } from "@/shared/types";

export default function EntriesTable({ entries }: { entries?: TEntry[] }) {
  if (!entries) {
    return null;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Usuario
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3">
              Detalles
            </th>
          </tr>
        </thead>
        <tbody>
          {entries?.map((entry) => (
            <tr
              key={entry.id}
              className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
            >
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {entry.id}
              </th>
              <td className="px-6 py-4">{entry.user}</td>
              <td className="px-6 py-4">{entry.date.toDateString()}</td>
              <td className="px-6 py-4">{entry.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
