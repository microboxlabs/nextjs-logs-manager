import { auth } from "@/auth";
import { CustomNavbar, NotAuthenticated } from "@/components";

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
