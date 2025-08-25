import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box } from "../box";
import { Button } from "../button";
import ButtonGroup from "../buttonGroup/ButtonGroup";
import { Text } from "../text";
import Banner from "./Banner";

const meta = {
  title: "Example/Banner",
  component: Banner,
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
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    children: (
      <Box background="transparent" borderStyle={"none"}>
        <Text>
          Success banner Success banner Success banner Success banner Success banner Success banner Success banner
          Success banner Success banner Success banner Success banner Success banner
        </Text>
      </Box>
    ),
    variant: "danger",

    actions: (
      <ButtonGroup alignment="start">
        <Button size={"sm"} variant="outline" color="danger">
          Button 1
        </Button>
        <Button size={"sm"} variant="outline" color="danger">
          Button 2
        </Button>
      </ButtonGroup>
    ),
    radius: { tl: 12, tr: 12, bl: 12, br: { xl: 12 } },
  },
};

export const Success: Story = {
  args: {
    title: "Success",
  },
};
