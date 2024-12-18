import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Loader from ".";

export default {
    title: "Components/Loader",
    component: Loader,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: ["small", "medium", "large"],
        },
        colorStyle: {
            control: { type: "select" },
            options: ["primary", "secondary", "tertiary"],
        },
        overlay: {
            control: { type: "boolean" },
        },
    },
} as Meta<typeof Loader>;

const Template: StoryFn<typeof Loader> = (args) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {
    size: "medium",
    colorStyle: "primary",
    overlay: false,
};

export const SmallPrimary = Template.bind({});
SmallPrimary.args = {
    size: "small",
    colorStyle: "primary",
    overlay: false,
};

export const LargeSecondaryOverlay = Template.bind({});
LargeSecondaryOverlay.args = {
    size: "large",
    colorStyle: "secondary",
    overlay: true,
};

export const MediumTertiaryOverlay = Template.bind({});
MediumTertiaryOverlay.args = {
    size: "medium",
    colorStyle: "tertiary",
    overlay: true,
};
