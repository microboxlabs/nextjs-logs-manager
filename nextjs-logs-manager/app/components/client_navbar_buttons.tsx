"use client";

import { Button } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import {
  HiArrowLeft,
  HiDocumentAdd,
  HiOutlineChevronLeft,
} from "react-icons/hi";

interface NavbarProps {
  roleId: number;
}

export const BackButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname == "/log_loading") {
    // here i might change router.push for router.back so if the page is bigger i can go back from other routes
    return (
      <Button color="gray" onClick={() => router.push("/")}>
        <HiOutlineChevronLeft className="size-6" />
      </Button>
    );
  } else {
    <></>;
  }
};

export const AddButton: React.FC<NavbarProps> = ({ roleId }) => {
  const pathname = usePathname();
  const router = useRouter();

  if (roleId == 1 && pathname != "/log_loading") {
    return (
      <Button color="green" onClick={() => router.push("/log_loading")}>
        <HiDocumentAdd className="size-6" />
      </Button>
    );
  } else {
    <></>;
  }
};
