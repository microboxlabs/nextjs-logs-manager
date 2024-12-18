import { Meta, StoryFn } from "@storybook/react";
import AvatarMenu, { AvatarMenuProps } from ".";

export default {
    title: "Components/AvatarMenu",
    component: AvatarMenu,
    argTypes: {
        userName: { control: "text" },
        userEmail: { control: "text" },
        userRole: { control: "text" },
        avatarImg: { control: "text" },
    },
} as Meta<AvatarMenuProps>;

const Template: StoryFn<AvatarMenuProps> = (args) => <AvatarMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    userRole: "Admin",
    avatarImg: "/images/people/profile-picture-5.jpg",
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
    userName: "Jane Doe",
    userEmail: "jane.doe@example.com",
    userRole: "User",
    avatarImg: "", // Sin imagen para mostrar las iniciales como placeholder
};

export const OnlyEmail = Template.bind({});
OnlyEmail.args = {
    userEmail: "email.only@example.com",
};
