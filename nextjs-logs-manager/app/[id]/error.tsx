"use client";

export default function LogViewPageError({ reset }: { reset: () => void }) {
  return (
    <>
      <h1>Algo sali&oacute; mal</h1>
      <button
        type="button"
        className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => reset()}
      >
        Intentar de nuevo
      </button>
    </>
  );
}
