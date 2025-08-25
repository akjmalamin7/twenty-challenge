import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import VerifyStatus from "./VerifyStatus";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/VerifyStatus",
  component: VerifyStatus,
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
} satisfies Meta<typeof VerifyStatus>;

export default meta;
type Story = StoryObj<typeof VerifyStatus>;

export const Default: Story = {
  args: {

  },
};
