import { Button, Label, TextInput } from "flowbite-react";
import Link from "next/link";

// This code will show the login or register form
const Main = async () => {
  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      <form className="flex max-w-md flex-col gap-4">
        <h2 className="flex-col place-content-center text-center text-2xl dark:text-white">
          Login
        </h2>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Username" />
          </div>
          <TextInput id="username" type="text" placeholder="Pedro" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput id="password" type="password" required />
        </div>
        <Button className="mb-2 text-center" type="submit">
          Log In
        </Button>
        <h3 className="text-center dark:text-gray-400">
          or create an account{" "}
          <Link
            href="/register"
            className="text-cyan-600 hover:underline dark:text-cyan-500"
          >
            here.
          </Link>
        </h3>
      </form>
    </main>
  );
};

export default Main;
