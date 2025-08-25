import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/internal/test';
import { Box } from '../box';
import BlockStack from './BlockStack';

const meta = {
  title: 'Example/BlockStack',
  component: BlockStack,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof BlockStack>;

export default meta;
type Story = StoryObj<typeof BlockStack>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Box padding={80} order={5}>
          A
        </Box>
        <Box padding={80} order={4}>
          B
        </Box>
        <Box padding={80} order={3} radius={10}>
          C
        </Box>
        <Box padding={80} order={2}>
          D
        </Box>
        <Box padding={80} order={1}>
          E
        </Box>
      </>
    ),

    gap: 50,
    shadow: { xs: 'none' },
    border: true,
    as: 'div',
  },
};
