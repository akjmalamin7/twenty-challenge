import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import SkeletonThumbnail from "./SkeletonThumbnail"; // <-- import the component, not the story file

const meta = {
  title: "Example/SkeletonThumbnail",
  component: SkeletonThumbnail,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg", "auto"],
      control: { type: "select" },
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof SkeletonThumbnail>;

export default meta;
type Story = StoryObj<typeof SkeletonThumbnail>;

export const SkeletonThumbnailDefault: Story = {
  args: { size: "auto" },
};
export const SkeletonThumbnailXs: Story = {
  args: { size: "xs" },
};
export const SkeletonThumbnailSm: Story = {
  args: { size: "sm" },
};
export const SkeletonThumbnailMd: Story = {
  args: { size: "md" },
};
export const SkeletonThumbnailLg: Story = {
  args: { size: "lg" },
};
