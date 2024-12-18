"use client";

import { SessionProvider } from "next-auth/react";

/**
 * A wrapper component that provides session context to its children.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the session provider.
 *
 * @returns {JSX.Element} The session provider wrapping the children components.
 */
export default function SessionWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SessionProvider>{children}</SessionProvider>;
}
