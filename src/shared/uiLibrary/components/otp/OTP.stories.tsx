import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import OTP from "./OTP";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/OTP",
  component: OTP,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
    label: { control: "text" },
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: "select" },
    },
  },

  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof OTP>;

export default meta;
type Story = StoryObj<typeof OTP>;

export const Default: Story = {
  args: {
    label: "OTP",
    size: "sm"

  },
};
export const Error: Story = {
  args: {
    label: "OTP",
    size: "sm",
    error: {
      status: true,
      message: "Something went wrong"
    }
  },
};

export const Disabled: Story = {
  args: {
    label: "OTP",
    size: "sm",
    disabled: true
  },
};
export const ReadOnly: Story = {
  args: {
    label: "OTP",
    size: "sm",
    readOnly: true
  },
};
export const HelpText: Story = {
  args: {
    label: "OTP",
    size: "sm",
    helpText: "Your 6 digit otp"
  },
};
