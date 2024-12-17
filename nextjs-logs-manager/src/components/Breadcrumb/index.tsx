import {
    Breadcrumb as FlowbiteBreadcrumb,
    BreadcrumbItem as FlowbiteBreadcrumbItem,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { usePathname } from "next/navigation";

const Breadcrumb: React.FC = () => {
    const pathname = usePathname();

    const pathSegments = pathname ? pathname.split("/").filter((segment) => segment) : [];

    type BreadcrumbItem = {
        label: string;
        href?: string;
        icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    };

    const breadcrumbItems: BreadcrumbItem[] = [
        {
            label: "Home",
            href: "/dashboard",
            icon: HiHome,
        },
        ...pathSegments
            .filter((_, index) => index > 0)
            .map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 2).join("/")}`;
                const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
                return { label, href };
            }),
    ];

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
