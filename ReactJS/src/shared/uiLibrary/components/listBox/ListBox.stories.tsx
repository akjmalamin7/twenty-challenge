import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import { BlockStack } from "../blockStack";
import { Card } from "../card";
import { InlineStack } from "../inlineStack";
import { Text } from "../text";
import Listbox from "./ListBox";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Listbox",
  component: Listbox,
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
} satisfies Meta<typeof Listbox>;

export default meta;

type Story = StoryObj<typeof Listbox>;

export const Default: Story = {
  render: (args) => (
    <InlineStack style={{ width: "300px" }}>
      <Card padding={50}>
        <Listbox {...args}  >
          <Listbox.Option size="md" >
            <Text size="md" weight="regular" color="primary">
              Item 1
            </Text>
          </Listbox.Option>
          <Listbox.Option size="md" isActive >
            <Text size="md" weight="regular" color="primary">
              Item 2
            </Text>
          </Listbox.Option>
          <Listbox.Option size="md" >
            <Text size="md" weight="regular" color="primary">
              Item 3
            </Text>
          </Listbox.Option>
          <Listbox.Option size="md" >
            <Text size="md" weight="regular" color="primary">
              Item 4
            </Text>
          </Listbox.Option>
          <Listbox.Option size="md" >
            <Text size="md" weight="regular" color="primary">
              Item 5
            </Text>
          </Listbox.Option>
        </Listbox>
      </Card>
    </InlineStack>
  ),
};
export const Separator: Story = {
  render: (args) => (
    <BlockStack style={{ width: "300px" }}>
      <Card padding={{ py: 50 }}>
        <Listbox {...args}  >
          <Listbox.Option size="xl" separator>
            <Text size="md" weight="regular" color="primary">
              Item 1
            </Text>
          </Listbox.Option>
          <Listbox.Option size="xl" isActive separator>
            <Text size="md" weight="regular" color="primary">
              Item 2
            </Text>
          </Listbox.Option>
          <Listbox.Option size="xl" separator>
            <Text size="md" weight="regular" color="primary">
              Item 3
            </Text>
          </Listbox.Option>
          <Listbox.Option size="xl" separator>
            <Text size="md" weight="regular" color="primary">
              Item 4
            </Text>
          </Listbox.Option>
          <Listbox.Option size="xl" separator>
            <Text size="md" weight="regular" color="primary">
              Item 5
            </Text>
          </Listbox.Option>
        </Listbox>
      </Card>
    </BlockStack>
  ),
};