"use client";

import { Button, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { Login } from "./actions";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

const Main = () => {
  const [state, formAction] = useFormState(Login, initialState);
  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      <form className="flex max-w-md flex-col gap-4" action={formAction}>
        <h2 className="flex-col place-content-center text-center text-2xl dark:text-white">
          Login
        </h2>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Username" />
          </div>
          <TextInput
            id="username"
            type="text"
            name="username"
            placeholder="Pedro"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput id="password" type="password" name="password" required />
        </div>
        {state?.message && (
          <p className="max-w-xs overflow-hidden break-words text-sm text-red-500">
            {state.message}
          </p>
        )}
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
