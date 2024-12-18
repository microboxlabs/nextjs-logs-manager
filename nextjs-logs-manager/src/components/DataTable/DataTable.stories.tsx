import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import DataTable from ".";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

// Definir las historias del componente
export default {
    title: "Components/DataTable",
    component: DataTable,
} as Meta<typeof DataTable>;

const Template: StoryFn<typeof DataTable> = (args) => <DataTable {...args} />;

export const Default = Template.bind({});
Default.args = {
    columns: [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
    ],
    data: [
        { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Editor" },
        { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "Viewer" },
    ],
};

export const WithActions = Template.bind({});
WithActions.args = {
    columns: [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        {
            key: "actions", label: "Actions", render: (value, row) => (
                <div className="flex gap-2">
                    <button onClick={() => console.log(`Edit ${row.name}`)}>
                        <AiFillEdit className="text-blue-600" />
                    </button>
                    <button onClick={() => console.log(`Delete ${row.name}`)}>
                        <AiFillDelete className="text-red-600" />
                    </button>
                </div>
            )
        },
    ],
    data: [
        { id: 1, name: "John Doe", email: "john.doe@example.com" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com" },
    ],
};

export const WithFilters = Template.bind({});
WithFilters.args = {
    columns: [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        {
            key: "role",
            label: "Role",
            isDropdown: true,
            dropdownOptions: ["Admin", "Editor", "Viewer"],
        },
    ],
    data: [
        { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Editor" },
        { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "Viewer" },
    ],
};

export const WithDateFilter = Template.bind({});
WithDateFilter.args = {
    columns: [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "createdAt", label: "Created At", isDate: true },
    ],
    data: [
        { id: 1, name: "John Doe", email: "john.doe@example.com", createdAt: "2024-12-01" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", createdAt: "2024-12-15" },
        { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", createdAt: "2024-12-17" },
    ],
};
