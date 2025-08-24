import type { Meta, StoryObj } from "@storybook/react-vite";
import SnackBar from "./SnackBar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SnackBar> = {
  title: "Example/SnackBar",
  component: SnackBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    background: {
      options: ["primary", "secondary", "success", "info", "warning", "danger", "white", "blue"],
      control: { type: "select" },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onDismiss: () => console.log("Dismiss clicked"),
  },
};

export default meta;
type Story = StoryObj<typeof SnackBar>;

// 🔹 Default Snackbar
export const Default: Story = {
  args: {
    content: "This is a default snackbar.",
    background: "white",
  },
};

// 🔹 Fully loaded Snackbar
export const FullFeatured: Story = {
  args: {
    content: "Custom notification!",
    background: "primary",
    action: {
      content: "Undo",
      onAction: () => console.log("Undo clicked"),
    },
    onClick: () => console.log("Snackbar clicked"),
  },
};
