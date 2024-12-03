import Link from "next/link";

const Main = () => {
  return (
    <main className="flex grow items-center justify-center dark:bg-gray-800">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-2xl dark:text-white">
          Access Denied: this is only accessible by admin users
        </h1>
        <Link className="text-center text-blue-500" href="/">
          Return to the dashboard
        </Link>
      </div>
    </main>
  );
};

export default Main;
