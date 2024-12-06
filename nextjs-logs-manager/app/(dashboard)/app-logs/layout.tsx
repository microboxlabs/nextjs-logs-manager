import { auth } from "@/auth";
import { NotAuthenticated } from "@/components/shared/NotAuthenticated";

export default async function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return (
      <NotAuthenticated />
    )
  }
  
  return (
    <div>
      {children}
    </div>
  );
}
