import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import Switch from "./Switch";

const meta = {
  title: "Example/Switch",
  component: Switch,
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
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

export const Primary: Story = {
  args: {
    label: "Primary",
    variant: "primary",
  },
};
export const Secondary: Story = {
  args: {
    label: "Secondary",
    variant: "secondary",
  },
};
export const Tertiary: Story = {
  args: {
    label: "Tertiary",
    variant: "tertiary",
  },
};
export const Success: Story = {
  args: {
    label: "Success",
    variant: "success",
  },
};
export const Info: Story = {
  args: {
    label: "Info",
    variant: "info",
  },
};
export const Danger: Story = {
  args: {
    label: "Danger",
    variant: "danger",
  },
};
export const White: Story = {
  args: {
    label: "White",
    variant: "white",
  },
};
export const Blue: Story = {
  args: {
    label: "Blue",
    variant: "blue",
  },
};
