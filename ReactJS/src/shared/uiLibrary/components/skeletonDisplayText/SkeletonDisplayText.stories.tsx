import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import SkeletonDisplayText from "./SkeletonDisplayText";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/SkeletonDisplayText",
  component: SkeletonDisplayText,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg"],
      control: { type: "select" },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof SkeletonDisplayText>;

export default meta;

type Story = StoryObj<typeof SkeletonDisplayText>;
export const SkeletonDisplayTextDefault: Story = {
  args: {
    size: "xs",
    line: 4,
  },
};
export const SkeletonDisplayTextXs: Story = {
  args: {
    size: "xs",
    line: 8,
  },
};
export const SkeletonDisplayTextSm: Story = {
  args: {
    size: "sm",
    line: 6,
  },
};
export const SkeletonDisplayTextMd: Story = {
  args: {
    size: "md",
    line: 4,
  },
};
export const SkeletonDisplayTextLg: Story = {
  args: {
    size: "lg",
    line: 6,
  },
};
