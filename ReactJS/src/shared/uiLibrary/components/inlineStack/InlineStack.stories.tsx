import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import { Box } from "../box";
import InlineStack from "./InlineStack";

const meta = {
  title: "Example/InlineStack",
  component: InlineStack,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    flexDirection: {
      options: ["row", "row-reverse"],
      control: { type: "select" },
    },
    flexWrap: {
      options: ["nowrap", "wrap", "wrap-reverse", "initial", "inherit"],
      control: { type: "select" },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof InlineStack>;

export default meta;
type Story = StoryObj<typeof InlineStack>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Box padding={80} order={5} background="success">
          A
        </Box>
        <Box padding={80} background="danger">
          B
        </Box>
        <Box padding={80} background="success">
          C
        </Box>
        <Box padding={80} background="warning">
          D
        </Box>
        <Box padding={80} background="info">
          E
        </Box>
      </>
    ),

    gap: 50,
    border: true,
  },
};
export const JustifyCentered: Story = {
  args: {
    children: (
      <>
        <Box padding={80} background="primary">
          A
        </Box>
        <Box padding={80} background="secondary">
          B
        </Box>
      </>
    ),
    gap: 50,
    justifyContent: "center",
  },
};
export const SpaceBetween: Story = {
  args: {
    children: (
      <>
        <Box padding={80} background="primary">
          A
        </Box>
        <Box padding={80} background="secondary">
          B
        </Box>
        <Box padding={80} background="tertiary">
          C
        </Box>
        <Box padding={80} background="success">
          D
        </Box>
        <Box padding={80} background="info">
          E
        </Box>
      </>
    ),
    gap: 50,
    justifyContent: "space-between",
  },
};
export const SpaceAround: Story = {
  args: {
    children: (
      <>
        <Box padding={80} background="primary">
          A
        </Box>
        <Box padding={80} background="secondary">
          B
        </Box>
        <Box padding={80} background="tertiary">
          C
        </Box>
        <Box padding={80} background="success">
          D
        </Box>
        <Box padding={80} background="info">
          E
        </Box>
      </>
    ),
    gap: 50,
    justifyContent: { xs: "space-around" },
  },
};
export const SpaceEvenly: Story = {
  args: {
    children: (
      <>
        <Box padding={80} background="primary">
          A
        </Box>
        <Box padding={80} background="secondary">
          B
        </Box>
        <Box padding={80} background="tertiary">
          C
        </Box>
        <Box padding={80} background="success">
          D
        </Box>
        <Box padding={80} background="info">
          E
        </Box>
      </>
    ),
    gap: 50,
    justifyContent: "space-evenly",
  },
};
export const JustifyContentEnd: Story = {
  args: {
    children: (
      <>
        <Box padding={80} background="primary">
          A
        </Box>
        <Box padding={80} background="secondary">
          B
        </Box>
        <Box padding={80} background="tertiary">
          C
        </Box>
        <Box padding={80} background="success">
          D
        </Box>
        <Box padding={80} background="info">
          E
        </Box>
      </>
    ),
    gap: 100,
    justifyContent: "end",
  },
};
export const JustifyContentStart: Story = {
  args: {
    children: (
      <>
        <Box padding={80} background="primary">
          A
        </Box>
        <Box padding={80} background="secondary">
          B
        </Box>
        <Box padding={80} background="tertiary">
          C
        </Box>
        <Box padding={80} background="success">
          D
        </Box>
        <Box padding={80} background="info">
          E
        </Box>
      </>
    ),
    gap: 100,
    justifyContent: "start",
  },
};
export const RowReverse: Story = {
  args: {
    children: (
      <>
        <Box padding={80} background="primary">
          A
        </Box>
        <Box padding={80} background="secondary">
          B
        </Box>
        <Box padding={80} background="tertiary">
          C
        </Box>
        <Box padding={80} background="success">
          D
        </Box>
        <Box padding={80} background="info">
          E
        </Box>
      </>
    ),
    flexDirection: "row-reverse",
    gap: 100,
    justifyContent: "start",
  },
};
export const FlexWrap: Story = {
  args: {
    children: (
      <>
        <Box padding={80} background="primary">
          A
        </Box>
        <Box padding={80} background="secondary">
          B
        </Box>
        <Box padding={80} background="tertiary">
          C
        </Box>
        <Box padding={80} background="success">
          D
        </Box>
        <Box padding={80} background="info">
          E
        </Box>
      </>
    ),
    gap: 100,
    justifyContent: "start",
    flexWrap: "wrap",
  },
};
