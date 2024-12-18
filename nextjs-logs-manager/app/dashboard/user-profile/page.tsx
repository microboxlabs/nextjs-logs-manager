"use client";

import { useEffect, useState } from "react";
import { Card, Badge, Tabs, Table, Avatar } from "flowbite-react";
import { HiOutlineViewGrid, HiOutlineTable } from "react-icons/hi";
import Loader from "../../../src/components/Loader";
import { useAlert } from "../../../src/contexts/AlertContext";
import { UserProfile, userService } from "../../../src/services/users.getById.service";
import Breadcrumb from "../../../src/components/Breadcrumb";

const UserProfilePage: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const { showAlert } = useAlert();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userData = await userService.fetchUserProfile();
                setUser(userData);
            } catch (error) {
                // console.error("Error fetching user profile:", error);
                showAlert("error", "Failed to load user profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [showAlert]);

    const placeholderInitials = user && user.email ? user.email.charAt(0).toUpperCase() : '';

    return (
        <div className="min-h-screen bg-gray-50 px-4 dark:bg-gray-900">
            <div className="mx-auto w-full max-w-6xl p-4">
                <Breadcrumb />
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader overlay={false} />
                    </div>
                ) : user ? (
                    <Card className="dark:bg-gray-800">
                        {/* profile header */}
                        <div className="flex items-center gap-4 pb-4">
                            <Avatar
                                alt="User profile"
                                rounded
                                placeholderInitials={placeholderInitials}
                                className="cursor-pointer"
                            />
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white sm:text-2xl">
                                    {user.email}
                                </h2>
                                <Badge
                                    color="info"
                                    size="xs"
                                    className="w-fit text-xs font-medium sm:text-sm"
                                >
                                    {user.role}
                                </Badge>
                            </div>

                        </div>

                        {/* basic user info */}
                        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email:</p>
                                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Role:</p>
                                <p className="text-lg font-medium capitalize text-gray-800 dark:text-gray-200">{user.role}</p>
                            </div>
                        </div>

                        {/* Permissions section */}
                        <div className="mt-10">
                            <h3 className="mb-3 text-lg font-semibold text-gray-700 dark:text-gray-300">
                                Permissions
                            </h3>
                            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                Choose how you want to view the permissions:
                            </p>
                            {user.permissions.length > 0 ? (
                                <Tabs style="underline">
                                    <Tabs.Item title="Grid View" icon={HiOutlineViewGrid}>
                                        {/* Grid view using badges */}
                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                            {user.permissions.map((permission, index) => (
                                                <Badge
                                                    key={index}
                                                    color="gray"
                                                    className="text-sm font-medium uppercase dark:bg-gray-700 dark:text-gray-200"
                                                >
                                                    {permission}
                                                </Badge>
                                            ))}
                                        </div>
                                    </Tabs.Item>
                                    <Tabs.Item title="Table View" icon={HiOutlineTable}>
                                        {/* Table view */}
                                        <Table className="min-w-full overflow-hidden text-left text-sm dark:text-gray-200">
                                            <Table.Head>
                                                <Table.HeadCell>Permission</Table.HeadCell>
                                            </Table.Head>
                                            <Table.Body className="divide-y dark:divide-gray-700">
                                                {user.permissions.map((permission, index) => (
                                                    <Table.Row key={index} className="bg-white dark:bg-gray-800">
                                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                            {permission}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))}
                                            </Table.Body>
                                        </Table>
                                    </Tabs.Item>
                                </Tabs>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">
                                    No permissions assigned.
                                </p>
                            )}
                        </div>
                    </Card>
                ) : (
                    <p className="text-center text-red-500">User not found.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;
