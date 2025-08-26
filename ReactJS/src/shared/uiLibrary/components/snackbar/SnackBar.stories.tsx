import type { Meta, StoryObj } from "@storybook/react-vite";
import { BlockStack } from "../blockStack";
import { Button } from "../button";
import SnackBar from "./SnackBar";
import SnackBarProvider from "./SnackBarProvider";
import { useSnackbar } from "./useSnackbar";

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

const ToastTester = () => {
  const snackbar = useSnackbar();
  const handleClick = () => {
    snackbar.error(
      "Network request failed"
      //   {
      //   duration: 4000,
      //   action: {
      //     content: 'Undo',
      //     onAction: () => console.log('Undo clicked'),
      //   },
      // }
    );
  };

  return <Button onClick={handleClick}>Show Toast</Button>;
};


// 🔹 Default Snackbar
export const Default: Story = {
  render: (args) => (
    <BlockStack>
      <SnackBarProvider {...args}
        snackbarPosition="bottom-center"
        defaultProps={{
          background: "white",
          duration: 2500,
        }}
      >
        <ToastTester />
      </SnackBarProvider>
    </BlockStack>
  )
};
export const FullFeatured: Story = {
  render: (args) => (
    <BlockStack>
      <SnackBarProvider {...args}

        snackbarPosition="bottom-right"
        defaultProps={{
          background: "white",
          duration: 2500,
        }}
      >
        <ToastTester />
      </SnackBarProvider>
    </BlockStack>
  )
};
