import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import Textarea from "./Textarea";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Textarea",
  component: Textarea,
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
      options: ["sm", "md", "lg"],
      control: { type: "select" },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: "Label",
    labelAction: "Action",
    helpText: "Help text",
    radius: 18,
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
export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    label: "Disabled",
    disabled: true,
  },
};
export const Readonly: Story = {
  args: {
    placeholder: "Readonly",
    label: "Readonly",
    readOnly: true,
    resize: false,
  },
};
export const Resize: Story = {
  args: {
    placeholder: "Resize",
    label: "Readonly",
    resize: false,
  },
};
