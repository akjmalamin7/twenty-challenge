import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import SoppiyaIcon from "./SoppiyaIcon";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/SoppiyaIcon",
  component: SoppiyaIcon,
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
} satisfies Meta<typeof SoppiyaIcon>;

export default meta;
type Story = StoryObj<typeof SoppiyaIcon>;

export const Default: Story = {
  args: {
    color: "success",
    icon: "check-verified.svg",
    size: "lg"
  },
};
export const Primary: Story = {
  args: {
    color: "primary",
    icon: "check-verified.svg",
    size: "lg"
  },
};
export const Secondary: Story = {
  args: {
    color: "secondary",
    icon: "check-verified.svg",
    size: "lg"
  },
};
export const Tertiary: Story = {
  args: {
    color: "tertiary",
    icon: "check-verified.svg",
    size: "lg"
  },
};
export const Info: Story = {
  args: {
    color: "info",
    icon: "check-verified.svg",
    size: "lg"
  },
};
export const Success: Story = {
  args: {
    color: "success",
    icon: "check-verified.svg",
    size: "lg"
  },
};
export const Warning: Story = {
  args: {
    color: "warning",
    icon: "check-verified.svg",
    size: "lg"
  },
};
export const Danger: Story = {
  args: {
    color: "danger",
    icon: "check-verified.svg",
    size: "lg"
  },
};
export const Blue: Story = {
  args: {
    color: "blue",
    icon: "check-verified.svg",
    size: "lg"
  },
};
export const White: Story = {
  args: {
    color: "white",
    icon: "check-verified.svg",
    size: "lg"
  },
};
