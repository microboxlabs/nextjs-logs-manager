import Link from "next/link";

export default function NavigationBar() {

  return (
    <nav className="mb-6 border-b border-solid border-gray-200 bg-white py-2.5 lg:mb-8 lg:px-6">
      <div className="container flex flex-wrap items-center justify-between">
        <Link href="/" className="grid place-items-center">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Logs manager
          </span>
        </Link>
        <div className="flex items-center lg:order-2">
          <Link
            href="/sign-in"
            className="mr-2 rounded-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 lg:px-5 lg:py-2.5"
          >
            Iniciar sesi&oacute;n
          </Link>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 lg:hidden"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="hidden w-full items-center justify-between lg:order-1 lg:ml-8 lg:mr-auto lg:flex lg:w-auto"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col lg:mt-0 lg:flex-row lg:space-x-8">
            <li>
              <Link href="/">Registros</Link>
            </li>
            <li>
              <Link href="/entries">Subidas</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
