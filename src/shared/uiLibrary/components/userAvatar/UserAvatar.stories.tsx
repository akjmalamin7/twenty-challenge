import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import UserAvatar from "./UserAvatar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/UserAvatar",
  component: UserAvatar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof UserAvatar>;

export default meta;
type Story = StoryObj<typeof UserAvatar>;

export const Default: Story = {
  args: {
    size: "md",
    name: "John Doe",
    radius: 3,
  },
};
export const AvatarXs: Story = {
  args: {
    size: "xs",
    name: "John Doe",
  },
};
export const AvatarSm: Story = {
  args: {
    size: "sm",
    name: "John Doe",
  },
};
export const AvatarMd: Story = {
  args: {
    size: "md",
    name: "John Doe",
  },
};
export const AvatarLg: Story = {
  args: {
    size: "lg",
    name: "John Doe",
  },
};
export const AvatarXl: Story = {
  args: {
    size: "xl",
    name: "John Doe",
  },
};
export const AvatarXXL: Story = {
  args: {
    size: "xxl",
    name: "John Doe",
  },
};
export const AvatarXXXL: Story = {
  args: {
    size: "xxxl",
    name: "John Doe",
    editAble: true,
  },
};
