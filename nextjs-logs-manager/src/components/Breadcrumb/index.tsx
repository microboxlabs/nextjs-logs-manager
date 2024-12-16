"use client";

import { Breadcrumb as FlowbiteBreadcrumb, BreadcrumbItem as FlowbiteBreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { usePathname } from "next/navigation";

const Breadcrumb: React.FC = () => {
    const pathname = usePathname();

    // Dividir el pathname en segmentos para generar el breadcrumb
    const pathSegments = pathname.split("/").filter((segment) => segment);

    // Generar los ítems del breadcrumb
    type BreadcrumbItem = {
        label: string;
        href?: string;
        icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    };

    const breadcrumbItems: BreadcrumbItem[] = [
        {
            label: "Home",
            href: "/",
            icon: HiHome,
        },
        ...pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const label = segment.charAt(0).toUpperCase() + segment.slice(1);
            return { label, href };
        }),
    ];

    // El último elemento será texto sin enlace
    if (breadcrumbItems.length > 1) {
        breadcrumbItems[breadcrumbItems.length - 1].href = undefined;
    }

    return (
        <FlowbiteBreadcrumb aria-label="Breadcrumb">
            {breadcrumbItems.map((item, index) =>
                item.href ? (
                    <FlowbiteBreadcrumbItem key={index} href={item.href} icon={item.icon}>
                        {item.label}
                    </FlowbiteBreadcrumbItem>
                ) : (
                    <FlowbiteBreadcrumbItem key={index} icon={item.icon}>
                        {item.label}
                    </FlowbiteBreadcrumbItem>
                )
            )}
        </FlowbiteBreadcrumb>
    );
};

export default Breadcrumb;
