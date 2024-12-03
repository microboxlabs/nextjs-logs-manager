"use server";
import { PrismaClient } from "@prisma/client";

export const DataUpload = async (formData: FormData) => {
  const prisma = new PrismaClient();

  const file = formData.get("file") as File;

  if (file.size == 0) {
    throw new Error("Select a file to upload.");
  }

  if (file.type !== "text/plain" && !file.name.endsWith(".txt")) {
    console.error("Invalid file type. Only .txt files are allowed.");
    throw new Error("Invalid file type. Only .txt files are allowed.");
  }

  // i do this because windows tends to add \r to some \n so it missmatches in the regex
  const logEntries = (await file.text())
    .split("\n")
    .map((line) => line.trim().replace(/\r$/, "")) // Remove trailing \r
    .filter((line) => line !== "");

  let failed_loads = 0;

  for (const log of logEntries) {
    const regex = /^\[(.*?)\] \[(.*?)\] (.*?): (.*)$/;
    const match = log.match(regex);

    if (match) {
      // the reason of the z is because the date by default dont set the timezone (so when i upload a datetime with hour 10:01 ot shows 13:01)
      let datetime = new Date(match[1] + "Z");

      let type = await prisma.type.findUnique({
        where: {
          name: match[2],
        },
      });

      let serviceName = match[3];
      let message = match[4];

      if (!type) {
        failed_loads += 1;
        continue;
      }

      try {
        await prisma.log.create({
          data: {
            datetime: datetime,
            typeId: type?.id,
            service: serviceName,
            message: message,
          },
        });
      } catch (error) {
        failed_loads += 1;
        continue;
      }
    }
  }

  if (failed_loads != 0) {
    return {
      success: true,
      message:
        "The upload was successful but some elements where not correctly loaded",
    };
  }

  return {
    success: true,
    message: "The upload was successful",
  };
};
