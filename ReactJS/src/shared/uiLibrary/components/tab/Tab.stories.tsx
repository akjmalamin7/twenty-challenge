import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import Tab from "./Tab";

const meta = {
  title: "Example/Tab",
  component: Tab,
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
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  args: {
    tabs: [
      { id: "1", title: "Tab 1", children: "children 1" },
      { id: "2", title: "Tab 2", children: "children 2" },
      { id: "3", title: "Tab 3", children: "children 3" },
    ],
  },
};
export const Normal: Story = {
  args: {
    tabButtonSize: "normal",
    tabButtonStyle: "normal",
    separator: false,
    tabs: [
      { id: "1", title: "Tab 1", children: "children 1" },
      { id: "2", title: "Tab 2", children: "children 2" },
      { id: "3", title: "Tab 3", children: "children 3" },
    ],
  },
};
