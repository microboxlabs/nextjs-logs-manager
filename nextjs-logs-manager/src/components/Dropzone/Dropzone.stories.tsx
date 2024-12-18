import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Dropzone } from ".";

export default {
    title: "Components/Dropzone",
    component: Dropzone,
    parameters: {
        layout: "centered",
    },
} as Meta<typeof Dropzone>;

const Template: StoryFn<typeof Dropzone> = (args) => <Dropzone {...args} />;

export const Default = Template.bind({});
Default.args = {
    message: "Click to upload",
    subMessage: "TXT files only (max 2MB)",
    iconSize: "xl",
};

export const CustomSize = Template.bind({});
CustomSize.args = {
    message: "Drop your file here",
    subMessage: "PDF files only (max 5MB)",
    iconSize: "lg",
    accept: ".pdf",
    maxSize: 5,
};

export const WithFileSelected = Template.bind({});
WithFileSelected.args = {
    message: "Upload complete",
    subMessage: "File uploaded successfully",
    iconSize: "md",
    onFileSelect: (file) => console.log("Selected file:", file),
};

export const DraggingState = Template.bind({});
DraggingState.args = {
    message: "Drop file to upload",
    subMessage: "PNG or JPG files (max 10MB)",
    iconSize: "sm",
    accept: ".png, .jpg",
    maxSize: 10,
    className: "border-blue-500 bg-blue-100", // Simulating dragging state
};
