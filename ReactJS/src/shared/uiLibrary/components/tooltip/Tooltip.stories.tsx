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
  args: {
    content: "This is a tooltip",
    children: <Button size="sm">Hover Me</Button>,
  },
};

export const AutoPosition: Story = {
  args: {
    content: (
      <div>
        <p> Automatically adjusts position</p>
      </div>
    ),
    hoverDelay: 1,
    dismissOnMouseOut: true,
    persistOnClick: true,
    children: <Button size="sm">Hover Me</Button>,
  },
};

export const TopPosition: Story = {
  args: {
    content: (
      <div>
        <p>Tooltip Placement Top </p>
      </div>
    ),
    hoverDelay: 200,
    dismissOnMouseOut: true,
    persistOnClick: true,
    children: <Button size="sm">Hover Me</Button>,
    active: true,
    placement: "top",
  },
};

export const BottomPosition: Story = {
  args: {
    content: (
      <div>
        <p>Tooltip Placement Bottom </p>
      </div>
    ),
    hoverDelay: 200,
    dismissOnMouseOut: true,
    persistOnClick: true,
    children: <Button size="sm">Hover Me</Button>,
    active: true,
    placement: "bottom",
  },
};

export const LeftPosition: Story = {
  args: {
    content: (
      <div>
        <p>Tooltip Placement Left </p>
      </div>
    ),
    hoverDelay: 200,
    dismissOnMouseOut: true,
    persistOnClick: true,
    children: <Button size="sm">Hover Me</Button>,
    active: true,
    placement: "left",
  },
};
export const RightPosition: Story = {
  args: {
    content: (
      <div>
        <p>Tooltip Placement Right </p>
      </div>
    ),
    hoverDelay: 200,
    dismissOnMouseOut: true,
    persistOnClick: true,
    children: <Button size="sm">Hover Me</Button>,
    active: true,
    placement: "right",
  },
};
