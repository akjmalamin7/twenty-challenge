import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import { Box } from "../box";
import Grid from "./Grid";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Grid",
  component: Grid,
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
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof Grid>;

const GridItems = (
  <>
    <Grid.Col colSpanFull="full">
      <Box padding={50} background="secondary">
        Col span full
      </Box>
    </Grid.Col>
    <Grid.Col rowStart="2" rowEnd="4" rowSpan="5">
      <Box padding={50} background="secondary" style={{ height: "100%" }}>
        Grid col 2
      </Box>
    </Grid.Col>
    <Grid.Col>
      <Box padding={50} background="secondary">
        Grid col 3
      </Box>
    </Grid.Col>
    <Grid.Col colSpan="2" rowSpan="2">
      <Box padding={50} background="secondary" style={{ height: "100%" }}>
        Grid col 4
      </Box>
    </Grid.Col>
    <Grid.Col>
      <Box padding={50} background="secondary">
        Grid col 5
      </Box>
    </Grid.Col>
    <Grid.Col>
      <Box padding={50} background="secondary">
        Grid col 6
      </Box>
    </Grid.Col>
    <Grid.Col>
      <Box padding={50} background="secondary">
        Grid col 7
      </Box>
    </Grid.Col>
    <Grid.Col>
      <Box padding={50} background="secondary">
        Grid col 8
      </Box>
    </Grid.Col>
    <Grid.Col>
      <Box padding={50} background="secondary">
        Grid col 9
      </Box>
    </Grid.Col>
    <Grid.Col>
      <Box padding={50} background="secondary">
        Grid col 10
      </Box>
    </Grid.Col>
    <Grid.Col rowSpan="2">
      <Box padding={50} background="secondary" style={{ height: "100%" }}>
        Grid col 11
      </Box>
    </Grid.Col>
    <Grid.Col colSpan={"2"} rowSpan="1">
      <Box padding={50} background="secondary">
        Col span 2
      </Box>
    </Grid.Col>
    <Grid.Col colAuto={{ xs: "auto" }} colSpanFull={"full"}>
      <Box padding={50} background="secondary">
        Col span full
      </Box>
    </Grid.Col>
  </>
);
export const Default: Story = {
  args: {
    children: GridItems,
    gap: 30,
    cols: 4,
    rows: 9,
  },
};
