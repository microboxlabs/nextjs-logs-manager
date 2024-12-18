import { Meta, StoryFn } from "@storybook/react";
import AlertMessage, { AlertMessageProps } from ".";

export default {
    title: "Components/AlertMessage",
    component: AlertMessage,
    argTypes: {
        type: {
            control: { type: "select", options: ["success", "error", "info"] },
        },
        message: { control: "text" },
    },
} as Meta<typeof AlertMessage>;

const Template: StoryFn<typeof AlertMessage> = (args: AlertMessageProps) => (
    <AlertMessage {...args} />
);

export const Success = Template.bind({});
Success.args = {
    type: "success",
    message: "Operation successful",
};

export const Error = Template.bind({});
Error.args = {
    type: "error",
    message: "An error occurred",
};

export const Info = Template.bind({});
Info.args = {
    type: "info",
    message: "This is an informational message",
};
