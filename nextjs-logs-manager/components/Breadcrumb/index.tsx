"use client";

import { Breadcrumb as FlowbiteBreadcrumb } from "flowbite-react";
import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string; // Si es null, será un elemento de texto, no un link
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <FlowbiteBreadcrumb aria-label="Breadcrumb">
            {items.map((item, index) =>
                item.href ? (
                    <Link key={index} href={item.href} passHref>
                        <FlowbiteBreadcrumb.Item>
                            {item.label}
                        </FlowbiteBreadcrumb.Item>
                    </Link>
                ) : (
                    <FlowbiteBreadcrumb.Item key={index}>
                        {item.label}
                    </FlowbiteBreadcrumb.Item>
                )
            )}
        </FlowbiteBreadcrumb>
    );
};

export default Breadcrumb;
