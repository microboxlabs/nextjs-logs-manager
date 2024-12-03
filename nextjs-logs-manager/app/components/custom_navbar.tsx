import { Button, ButtonGroup, DarkThemeToggle } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import {
  HiArrowLeft,
  HiDocumentAdd,
  HiFolderAdd,
  HiLogout,
  HiOutlineArrowRight,
} from "react-icons/hi";

import { CiLogout } from "react-icons/ci";
import { deleteSession, verifySession } from "../_lib/session";
import { AddButton, BackButton } from "./client_navbar_buttons";

// this generates a lot of boilerplate, find a better way of just doing it once
const CustomNavbar = async () => {
  const session = await verifySession(false);

  return (
    <nav className="sticky left-0 top-0 z-10 w-full bg-gray-100 shadow-md dark:bg-gray-900">
      <div className="items-right container mx-auto flex justify-end p-4">
        {session && (
          // i do a form here so i can activate the "session deletion" as a server function
          <form
            className="flex flex-row justify-items-end  gap-5"
            action={deleteSession}
          >
            {/* Back button */}
            <BackButton />
            {/* Add button */}
            <AddButton roleId={session.roleId} />
            {/* Exit button */}
            <Button color="red" type="submit" className="flex ">
              <CiLogout className="size-6" />
            </Button>
          </form>
        )}
      </div>
    </nav>
  );
};

/*
const CustomNavbar: React.FC<NavbarProps> = async ({ session }) => {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 z-10 w-full bg-gray-100 shadow-md dark:bg-gray-900">
      <div className="container mx-auto flex items-center justify-between p-4">
        <DarkThemeToggle />
        {session && (
          <ButtonGroup outline>
            {pathname == "/log_loading" ? (
              <Button color="gray">
                <HiFolderAdd className="mr-3 h-4 w-4" /> Back
              </Button>
            ) : null}
            <Button color="gray">
              <HiLogout className="mr-3 h-4 w-4" /> Exit
            </Button>
            {session.roleId == 1 && pathname != "/log_loading" ? (
              <Button color="gray">
                <HiFolderAdd className="mr-3 h-4 w-4" /> Add
              </Button>
            ) : null}
          </ButtonGroup>
        )}
      </div>
    </nav>
  );
};
*/

export default CustomNavbar;
function fetchData() {
  throw new Error("Function not implemented.");
}
