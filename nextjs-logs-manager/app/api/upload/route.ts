import { NextRequest, NextResponse } from "next/server";
import { insertLog } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json(
      { success: false, message: "No file uploaded" },
      { status: 400 },
    );
  }

  const fileContent = await file.text();
  const lines = fileContent.split("\n");

  try {
    for (const line of lines) {
      const match = line.match(/\[(.+?)\] \[(.+?)\] (.+?): (.+)/);
      if (match) {
        const [, timestamp, level, service, message] = match;
        await insertLog({ timestamp, level, service, message });
      }
    }

    revalidatePath("/dashboard");

    return NextResponse.json({
      success: true,
      message: "File processed successfully",
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { success: false, message: "Error processing file" },
      { status: 500 },
    );
  }
}
