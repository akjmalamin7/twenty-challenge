export { default as SkeletonBodyText } from './SkeletonBodyText';

import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import SkeletonBodyText from "./SkeletonBodyText";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/SkeletonBodyText",
  component: SkeletonBodyText,
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
} satisfies Meta<typeof SkeletonBodyText>;

export default meta;

type Story = StoryObj<typeof SkeletonBodyText>;
export const SkeletonBodyTextDefault: Story = {
  args: {
    size: "sm",
    line: 4,
  },
};
export const SkeletonBodyTextXs: Story = {
  args: {
    size: "xs",
    line: 8,
  },
};
export const SkeletonBodyTextSm: Story = {
  args: {
    size: "sm",
    line: 6,
  },
};
export const SkeletonBodyTextMd: Story = {
  args: {
    size: "md",
    line: 4,
  },
};
export const SkeletonBodyTextLg: Story = {
  args: {
    size: { xs: "xs", sm: "sm", md: "lg", lg: "md" },
    line: 3,
  },
};
