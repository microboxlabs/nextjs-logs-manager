import { Meta, StoryFn } from "@storybook/react";
import { ClearButton } from "."; // Importa desde el archivo index.tsx
import { HiOutlineTrash } from "react-icons/hi";

export default {
    title: "Components/ClearButton",
    component: ClearButton,
    argTypes: {
        color: {
            control: {
                type: "select",
                options: ["gray", "red", "green", "blue", "yellow", "indigo", "purple", "pink"],
            },
        },
        size: {
            control: {
                type: "select",
                options: ["xs", "sm", "md", "lg", "xl"],
            },
        },
        icon: { control: false },
        onClick: { action: "clicked" },
    },
} as Meta;

const Template: StoryFn<typeof ClearButton> = (args) => <ClearButton {...args} />;

export const Default = Template.bind({});
Default.args = {
    color: "gray",
    size: "md",
    icon: <HiOutlineTrash />,
};

export const RedButton = Template.bind({});
RedButton.args = {
    color: "red",
    size: "lg",
    icon: <HiOutlineTrash />,
};

export const LargeButton = Template.bind({});
LargeButton.args = {
    color: "blue",
    size: "xl",
    icon: <HiOutlineTrash />,
};
