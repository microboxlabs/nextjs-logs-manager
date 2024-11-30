import { PrismaClient } from "@prisma/client";
import { Button, Label, Select, TextInput } from "flowbite-react";
import Link from "next/link";

const Main = async () => {
  const prisma = new PrismaClient();
  const roles = await prisma.role.findMany();

  const register = async (formData: FormData) => {
    "use server";

    console.log(formData.get("username"));
    console.log(formData.get("password"));
    console.log(formData.get("role"));
  };

  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      <form className="flex max-w-md flex-col gap-4" action={register}>
        <h2 className="flex-col place-content-center text-center text-2xl dark:text-white">
          Register
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
        <Button className="mb-2 text-center" type="submit">
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
