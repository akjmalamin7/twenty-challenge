import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import Spinner from "./Spinner";

const meta = {
  title: "Example/Spinner",
  component: Spinner,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      options: ["xsm", "sm", "md", "lg", "xlg"],
      control: { type: "select" },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof Spinner>;

export const DefaultSpinner: Story = {
  args: {},
};
export const XSM: Story = {
  args: {
    size: "xsm",
  },
};
export const SM: Story = {
  args: {
    size: "sm",
  },
};
export const MD: Story = {
  args: {
    size: "md",
  },
};
export const LG: Story = {
  args: {
    size: "lg",
  },
};
export const XLG: Story = {
  args: {
    size: "xlg",
  },
};
