import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button";
import Tooltip from "./Tooltip";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Tooltip> = {
  title: "Example/Tooltip",
  component: Tooltip,
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
  // args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args} content="Learn more"> <Button size="sm">Hover Me</Button></Tooltip>
  )
};

export const AutoPosition: Story = {
  render: (args) => (
    <Tooltip {...args} hoverDelay={1} dismissOnMouseOut persistOnClick content="Automatically adjusts position"> <Button size="sm">Hover Me</Button></Tooltip>
  )
};

export const TopPosition: Story = {
  render: (args) => (
    <Tooltip {...args} hoverDelay={200} dismissOnMouseOut persistOnClick active content="Tooltip Placement Top" placement="top"> <Button size="sm">Hover Me</Button></Tooltip>
  )
};

export const BottomPosition: Story = {
  render: (args) => (
    <Tooltip {...args} hoverDelay={200} dismissOnMouseOut persistOnClick active content="Tooltip Placement Top" placement="bottom"> <Button size="sm">Hover Me</Button></Tooltip>
  )
};

export const LeftPosition: Story = {
  render: (args) => (
    <Tooltip {...args} hoverDelay={200} dismissOnMouseOut persistOnClick active content="Tooltip Placement Top" placement="left"> <Button size="sm">Hover Me</Button></Tooltip>
  )
};
export const RightPosition: Story = {
  render: (args) => (
    <Tooltip {...args} hoverDelay={200} dismissOnMouseOut persistOnClick active content="Tooltip Placement Top" placement="right"> <Button size="sm">Hover Me</Button></Tooltip>
  )
};

