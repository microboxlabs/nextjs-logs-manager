import Link from "next/link";

const Main = () => {
  return (
    <main className="flex grow items-center justify-center dark:bg-gray-800">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-2xl dark:text-white">
          Dead end, theres nothing to see here
        </h1>
        <Link className="text-center text-blue-500" href="/">
          Return to home
        </Link>
      </div>
    </main>
  );
};

export default Main;
