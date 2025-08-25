import { ExceptionIcon } from "@/shared/uiLibrary/assets/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import { Text } from "../text";
import ExceptionList from "./ExceptionList";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/ExceptionList",
  component: ExceptionList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullWidth",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof ExceptionList>;

export default meta;
type Story = StoryObj<typeof ExceptionList>;

export const Success: Story = {
  args: {
    variant: "success",
    description: "Verified",
  },
};
export const Danger: Story = {
  args: {
    variant: "danger",
    description: "Error",
  },
};
export const Warning: Story = {
  args: {
    variant: "warning",
    description: "Not verified",
  },
};
export const Children: Story = {
  args: {
    children: (
      <>
        <span>
          <ExceptionIcon />
        </span>
        <Text color="danger" size="md" weight="regular" className="exception--icon">
          Error
        </Text>
      </>
    ),
  },
};
