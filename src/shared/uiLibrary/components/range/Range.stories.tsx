import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import Range from "./Range";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Range",
  component: Range,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "padded",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    value: { control: "number" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    suffix: { control: "text" },
    isInputField: { control: "boolean" },
    inputFieldPosition: {
      control: "select",
      options: ["start", "end"],
    },
    onOk: { action: "onOk triggered" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Range>;

export default meta;
type Story = StoryObj<typeof Range>;

export const Default: Story = {
  args: {
    label: "Range Slider",
    value: 10,
    min: 0,
    max: 100,
    step: 5,
    suffix: "%",
    isInputField: true,
  },
};
