import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Badge from './Badge';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Badge,
  title: 'Example/Badge',
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
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Neutral: Story = {
  args: {
    variant: 'neutral',
    children: 'Neutral',
  },
};
export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
};
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger',
  },
};

// export const Heading = {
//   args: {},
//   play: async ({ canvas }) => {
//     await expect(canvas.getByText(/Badge/gi)).toBeTruthy();
//   },
// } satisfies Story;
