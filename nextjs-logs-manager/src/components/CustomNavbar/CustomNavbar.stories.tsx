import { Meta, StoryFn } from "@storybook/react";
import CustomNavbar from ".";
import { SessionProvider } from "next-auth/react";

export default {
    title: "Components/CustomNavbar",
    component: CustomNavbar,
    decorators: [
        (Story) => (
            <SessionProvider
                session={{
                    user: {
                        email: "admin@example.com", role: "ADMIN",
                        permissions: [],
                        id: ""
                    },
                    expires: "2030-01-01T00:00:00.000Z",
                }}
            >
                <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-800 dark:text-white">
                    <Story />
                </div>
            </SessionProvider>
        ),
    ],
} as Meta;

const Template: StoryFn<typeof CustomNavbar> = () => <CustomNavbar />;

export const Default = Template.bind({});
Default.decorators = [
    (Story) => (
        <SessionProvider
            session={{
                user: {
                    email: "user@example.com", role: "USER",
                    permissions: [],
                    id: ""
                },
                expires: "2030-01-01T00:00:00.000Z",
            }}
        >
            <Story />
        </SessionProvider>
    ),
];
Default.parameters = {
    backgrounds: { default: "light" },
};

export const AdminView = Template.bind({});
AdminView.decorators = [
    (Story) => (
        <SessionProvider
            session={{
                user: {
                    email: "admin@example.com", role: "ADMIN",
                    permissions: [],
                    id: ""
                },
                expires: "2030-01-01T00:00:00.000Z",
            }}
        >
            <Story />
        </SessionProvider>
    ),
];
AdminView.parameters = {
    backgrounds: { default: "dark" },
};
