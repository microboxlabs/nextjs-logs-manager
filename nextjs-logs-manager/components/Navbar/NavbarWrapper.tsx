import { auth } from "@/lib/auth";
import { NavbarClient } from "./Navbar";

export async function NavbarWrapper() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const name = session.user?.name as string;
  const role = session.user?.role as string;

  return <NavbarClient name={name} role={role} />;
}
