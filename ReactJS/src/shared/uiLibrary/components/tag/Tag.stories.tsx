import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import Tag from "./Tag";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Tag",
  component: Tag,
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
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  render: (args) => (
    <Tag {...args} variant="default" children="Default Tag" />
  )
};
export const RemoveAble: Story = {
  render: (args) => (
    <Tag {...args} variant="removeAble" children="Remove Able Tag" />
  )
};
export const Clickable: Story = {
  render: (args) => (
    <Tag {...args} variant="clickAble" children="Clickable Tag" />
  )
};
export const WithLink: Story = {
  render: (args) => (
    <Tag {...args} variant="withLink" children="With Link Tag" />
  )
};
export const RemoveAbleWithLink: Story = {
  render: (args) => (
    <Tag {...args} variant="removeAbleWithLink" children="Remove Able With Link Tag" />
  )
};
