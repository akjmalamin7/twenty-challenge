import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import { Text } from "../text";
import List from "./List";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/List",
  component: List,
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
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof List>;

const listItems = (
  <>
    <List.Item>
      <Text size="md" weight="regular" color="primary">
        Item 1
      </Text>
    </List.Item>
    <List.Item>
      <Text size="md" weight="regular" color="primary">
        Item 2
      </Text>
    </List.Item>
    <List.Item>
      <Text size="md" weight="regular" color="primary">
        Item 3
      </Text>
    </List.Item>
    <List.Item>
      <Text size="md" weight="regular" color="primary">
        Item 4
      </Text>
    </List.Item>
    <List.Item>
      <Text size="md" weight="regular" color="primary">
        Item 5
      </Text>
    </List.Item>
  </>
);

export const None: Story = {
  args: {
    type: "none",
    children: listItems,
  },
};

export const Bullet: Story = {
  args: {
    type: "bullet",
    children: listItems,
  },
};

export const Number: Story = {
  args: {
    type: "number",
    children: listItems,
  },
};

export const ExtraTight: Story = {
  args: {
    type: "extraTight",
    children: listItems,
  },
};
