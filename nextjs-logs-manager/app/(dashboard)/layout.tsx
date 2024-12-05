import { auth } from "@/auth";
import { CustomNavbar } from "@/components";
import { NotAuthenticated } from "@/components/shared/NotAuthenticated";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    return <NotAuthenticated />;
  }

  return (
    <div>
      <CustomNavbar />
      {children}
    </div>
  );
}
