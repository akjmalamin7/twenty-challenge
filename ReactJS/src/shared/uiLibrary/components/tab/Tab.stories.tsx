import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import { BlockStack } from "../blockStack";
import { Card } from "../card";
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
const tabs = [
  {
    id: "1", title: "Tab 1", children: <BlockStack> <Card radius={{ bl: 12, br: 12, tl: 0, tr: 0 }} padding={70}>children 1</Card>
    </BlockStack>
  },
  { id: "2", title: "Tab 2", children: <BlockStack> <Card radius={{ bl: 12, br: 12, tl: 0, tr: 0 }} padding={70}>children 2</Card></BlockStack> },
  { id: "3", title: "Tab 3", children: <BlockStack> <Card radius={{ bl: 12, br: 12, tl: 0, tr: 0 }} padding={70}>children 3</Card></BlockStack> },
]
export const Default: Story = {
  render: (args) => (
    <Tab {...args} separator={false} tabs={tabs} />
  )
};

export const TabWithSeparator: Story = {
  render: (args) => (
    <Tab {...args} tabButtonSize="normal" tabButtonStyle="normal" separator tabs={tabs} />
  )
};
