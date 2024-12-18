import { Avatar, Dropdown } from "flowbite-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export interface AvatarMenuProps {
    userName?: string;
    userEmail: string;
    userRole?: string;
    avatarImg?: string;
}

/**
 * AvatarMenu component renders a dropdown menu with user information and actions.
 *
 * @param {string} userName - The name of the user.
 * @param {string} userEmail - The email of the user.
 * @param {string} userRole - The role of the user.
 * @param {string} [avatarImg="/images/people/profile-picture-5.jpg"] - The URL of the user's avatar image.
 *
 * @returns {JSX.Element} The rendered AvatarMenu component.
 *
 * @example
 * <AvatarMenu
 *   userName="John Doe"
 *   userEmail="john.doe@example.com"
 *   userRole="Admin"
 * />
 */
export default function AvatarMenu({
    userName,
    userEmail,
    userRole,
    avatarImg = "/images/people/profile-picture-5.jpg",
}: AvatarMenuProps) {
    const handleLogout = async () => {
        await signOut({ callbackUrl: "/login", redirect: true });
    };

    const placeholderInitials = userName?.charAt(0).toUpperCase() || userRole?.charAt(0).toUpperCase();

    return (
        <Dropdown
            label={
                <Avatar
                    alt="User settings"
                    // img={avatarImg || undefined} // Uncomment this line to use a custom image
                    rounded
                    placeholderInitials={placeholderInitials}
                    className="cursor-pointer"
                />
            }
            arrowIcon={false}
            inline
        >
            <Dropdown.Header>
                <span className="block text-sm font-semibold">{userName}</span>
                <span className="block truncate text-sm text-gray-500">{userEmail}</span>
            </Dropdown.Header>
            <Dropdown.Item as={Link} href="/dashboard/user-profile">
                Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout} className="text-red-500">
                Logout
            </Dropdown.Item>
        </Dropdown>
    );
}
