import { CustomNavbar } from "@/components";

export default function DashboardLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      <CustomNavbar />
      {children}
    </div>
  );
}