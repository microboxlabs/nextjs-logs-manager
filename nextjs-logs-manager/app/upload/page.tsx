import { FileUploader } from "@/components/FileUploader";
import { LogForm } from "@/components/LogForm";
import { NavbarWrapper } from "@/components/Navbar/NavbarWrapper";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UploadPage() {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "admin") {
    redirect(session ? "/dashboard" : "/");
  }

  return (
    <>
      <NavbarWrapper />
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">Upload Logs</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Upload Log File</h2>
            <FileUploader />
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold">Add Log Manually</h2>
            <LogForm />
          </div>
        </div>
      </div>
    </>
  );
}
