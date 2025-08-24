import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import { Button } from "../button";
import Modal from "./Modal";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Modal",
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;
const activator = (
  <div>
    <Button size={"sm"} variant="fill" color="primary">
      Open Modal
    </Button>
  </div>
);
const primaryAction = {
  content: "Primary Action",
  variation: "outline" as const,
  onAction: () => console.log("Primary Action Clicked"),
};

const secondaryAction = {
  content: "Secondary Action",
  onAction: () => console.log("Secondary Action Clicked"),
  color: "danger" as const,
  variation: "fill" as const,
};
const buttons = (
  <>
    <Button>Button</Button>
    <Button>Button</Button>
  </>
);
export const None: Story = {
  args: {
    children: "Modal",
    open: true,
    title: "Modal Title",
    activator: activator,
    primaryAction: primaryAction,
    secondaryAction: secondaryAction,
    buttons: buttons,
  },
};
