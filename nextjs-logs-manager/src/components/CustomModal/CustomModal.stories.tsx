import { Meta, StoryFn } from "@storybook/react";
import CustomModal from ".";
import { Button } from "flowbite-react";

export default {
    title: "Components/CustomModal",
    component: CustomModal,
    argTypes: {
        isOpen: { control: "boolean" },
        title: { control: "text" },
        onClose: { action: "closed" },
        children: { control: "text" },
        footerContent: { control: false },
        actionButton: { control: false },
    },
} as Meta;

const Template: StoryFn<typeof CustomModal> = (args) => <CustomModal {...args} />;

export const Default = Template.bind({});
Default.args = {
    isOpen: true,
    title: "Default Modal",
    children: "This is a sample modal content.",
};

export const WithFooter = Template.bind({});
WithFooter.args = {
    isOpen: true,
    title: "Modal with Footer",
    children: "This modal includes a footer with additional actions.",
    footerContent: <Button onClick={() => alert("Secondary action")}>Secondary</Button>,
    actionButton: <Button color="blue" onClick={() => alert("Primary action")}>Primary</Button>,
};

export const LargeModal = Template.bind({});
LargeModal.args = {
    isOpen: true,
    title: "Large Modal",
    children: "This is a larger modal with customizable content.",
};
