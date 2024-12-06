import { auth } from "@/auth";
import { NotAuthenticated } from "@/components/shared/NotAuthenticated";

export default async function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
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
