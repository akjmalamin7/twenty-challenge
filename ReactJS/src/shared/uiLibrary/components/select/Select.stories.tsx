import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import Select from "./Select";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Select",
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullWidth",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: { control: "text" },
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: "select" },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: "Default select",
    labelAction: "Action",
    options: [
      { name: "name", value: "value" },
      { name: "name", value: "value" },
      { name: "name", value: "value" },
    ],
    helpText: "Help text",
  },
};
export const Error: Story = {
  args: {
    label: "Error",
    options: [
      { name: "name", value: "value" },
      { name: "name", value: "value" },
      { name: "name", value: "value" },
    ],
    helpText: "Help text",
    error: {
      status: true,
      message: "Something went wrong!",
    },
  },
};
export const Disabled: Story = {
  args: {
    label: "Disabled select",
    labelAction: "Action",
    options: [
      { name: "name", value: "value" },
      { name: "name", value: "value" },
      { name: "name", value: "value" },
    ],
    disabled: true,
  },
};
