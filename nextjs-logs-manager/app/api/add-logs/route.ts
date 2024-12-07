import { NextRequest, NextResponse } from "next/server";
import { insertLog } from "@/lib/db";
import { logEntrySchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = logEntrySchema.parse(body);

    await insertLog(validatedData);

    revalidatePath("/dashboard");

    return NextResponse.json({
      success: true,
      message: "Log entry added successfully",
    });
  } catch (error) {
    console.error("Error adding log entry:", error);
    return NextResponse.json(
      { success: false, message: "Error adding log entry" },
      { status: 400 },
    );
  }
}
