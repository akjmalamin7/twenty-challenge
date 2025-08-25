import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import Input from "./Input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: { control: "text" },
    size: {
      options: ["sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Label",
    labelAction: "Action",
    helpText: "Help text",
  },
};
export const Password: Story = {
  args: {
    type: "password",
    label: "Password",
  },
};
export const Prefix: Story = {
  args: {
    label: "Prefix",
    placeholder: "Prefix",
    prefix: "3/455",
    suffixSeparator: true,
  },
};
export const Suffix: Story = {
  args: {
    label: "Suffix",
    placeholder: "Suffix",
    suffix: "5525/455",
    suffixSeparator: true,
  },
};
export const Error: Story = {
  args: {
    label: "Error",
    placeholder: "Error",
    error: {
      status: true,
      message: "Something occurred error",
    },
  },
};
export const LabelAction: Story = {
  args: {
    placeholder: "Error",
    labelAction: "Label Action",
  },
};
export const Search: Story = {
  args: {
    placeholder: "Search...",
    label: "Search",
    type: "search",
  },
};
export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    label: "Disabled",
    type: "text",
    disabled: true,
  },
};
export const Readonly: Story = {
  args: {
    placeholder: "Readonly",
    label: "Readonly",
    type: "text",
    readOnly: true,
  },
};
