import { PrismaClient } from "@prisma/client";
import { Button, FileInput, Label, Toast, ToastToggle } from "flowbite-react";
import Link from "next/link";
import { verifySession } from "../_lib/session";
import CustomNavbar from "../components/custom_navbar";

const Main = async () => {
  /* 
  const session = await verifySession();
  if (session?.roleId != 1) {
    return (
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <h1>You dont have authorization to access this data</h1>
      </main>
    );
  }
    */
  const prisma = new PrismaClient();

  const DataUpload = async (formData: FormData) => {
    "use server";
    const file = formData.get("file") as File;

    if (!file) {
      console.error("The file was not setted");
      return;
    }

    const logEntries = (await file.text()).split("\n");
    console.log(logEntries);
    logEntries.map((log) => {
      // extract date time
      // extract type
      // extract service name
      // extract message
      console.log(log);
      // revalidate path to reload???
    });

    /* 
    await prisma.log.create({
        data: {
            datetime: new Date(), // Set current datetime
            type: {
                connect: { id: typeId }, // Connect to the Type model
            },
            service,
            message,
        },
    });
    */
  };

  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      <form className="flex max-w-md flex-col gap-4" action={DataUpload}>
        <div className="mb-2 block">
          <Label htmlFor="file-upload" value="Upload log file" />
        </div>
        <FileInput id="file-upload" name="file" />
        <Button type="submit">Upload</Button>
      </form>
    </main>
  );
};

export default Main;
