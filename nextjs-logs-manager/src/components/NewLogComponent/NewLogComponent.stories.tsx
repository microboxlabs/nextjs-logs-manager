import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { NewLogComponent } from ".";

export default {
    title: "Components/NewLogComponent",
    component: NewLogComponent,
    parameters: {
        layout: "centered",
    },
} as Meta<typeof NewLogComponent>;

const Template: StoryFn<typeof NewLogComponent> = (args) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setUploadedFile(file);
        args.onFileSelect(file);
    };

    return (
        <div className="p-4" style={{ width: "500px", margin: "0 auto" }}>
            <NewLogComponent {...args} onFileSelect={handleFileSelect} />
            {uploadedFile && (
                <div className="mt-4 text-sm text-gray-700">
                    <p>Selected File:</p>
                    <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                </div>
            )}
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    onFileSelect: (file: File | null) => {
        console.log("File selected:", file);
    },
};
