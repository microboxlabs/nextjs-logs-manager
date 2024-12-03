"use client";

import {
  Button,
  DarkThemeToggle,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import Link from "next/link";
import { Register } from "./actions";
import { GetRoles } from "../_data/role";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

const initialState = {
  message: "",
};

interface Role {
  id: number;
  name: string;
}

const Main = () => {
  const [state, formAction] = useFormState(Register, initialState);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRoles = await GetRoles();
        setRoles(fetchedRoles);
      } catch (error) {
        console.error("The roles where not correctly loaded: " + error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex grow items-center justify-center gap-2 dark:bg-gray-800">
      <form className="flex max-w-md flex-col gap-4" action={formAction}>
        <h2 className="flex-col place-content-center text-center text-2xl dark:text-white">
          Register
        </h2>
        <div className="m-auto">
          <DarkThemeToggle />
        </div>
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
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="role" value="Select the user role" />
          </div>
          {/* Set this might be readed from the database */}
          <Select id="role" name="role" required>
            {roles.map((role) => {
              return (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              );
            })}
          </Select>
        </div>
        {state?.message && (
          <p className="max-w-xs overflow-hidden text-red-500">
            {state.message}
          </p>
        )}
        <Button
          className="mb-2 text-center"
          type="submit"
          disabled={roles.length === 0}
        >
          Register
        </Button>
        <h3 className="text-center dark:text-gray-400">
          or log in{" "}
          <Link
            href="/login"
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
