import { Navbar, NavbarBrand, NavbarCollapse } from "flowbite-react";

export function NavbarSkeleton() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="#">
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
      </NavbarBrand>
      <div className="flex items-center md:order-2">
        <div className="mr-4 h-8 w-24 animate-pulse rounded bg-gray-200"></div>
        <div className="h-10 w-20 animate-pulse rounded bg-gray-200"></div>
      </div>
      <NavbarCollapse>
        <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
      </NavbarCollapse>
    </Navbar>
  );
}
