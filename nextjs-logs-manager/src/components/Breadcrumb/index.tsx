import {
    Breadcrumb as FlowbiteBreadcrumb,
    BreadcrumbItem as FlowbiteBreadcrumbItem,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { usePathname } from "next/navigation";

/**
 * Breadcrumb component that generates a breadcrumb navigation based on the current pathname.
 * 
 * This component uses the `usePathname` hook to get the current pathname and splits it into segments
 * to create breadcrumb items. The first breadcrumb item is always "Home" with a link to the dashboard.
 * Subsequent breadcrumb items are generated from the pathname segments, with each segment capitalized
 * and hyphens replaced by spaces.
 * 
 * If there are multiple breadcrumb items, the last item's `href` is set to `undefined` to indicate
 * that it is the current page.
 * 
 * @returns {JSX.Element} The rendered breadcrumb navigation.
 */
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
