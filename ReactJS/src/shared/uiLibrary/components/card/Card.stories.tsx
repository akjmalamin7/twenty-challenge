import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/internal/test';
import Card from './Card';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Card',
  component: Card,
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
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'Card Component',
    padding: {
      px: { xs: 80, sm: 100, md: 150 },
      py: { xs: 80, sm: 100, md: 150 },
    },
    radius: 16,
    background: 'info',
  },
};
export const Padding: Story = {
  args: {
    children: 'Padding',
    padding: {
      px: { xs: 80, sm: 100, md: 150 },
      py: { xs: 80, sm: 100, md: 150 },
    },
  },
};
export const Radius: Story = {
  args: {
    children: 'Radius',
    padding: {
      px: { xs: 80, sm: 100, md: 150 },
      py: { xs: 80, sm: 100, md: 150 },
    },
    radius: {
      xs: 50,
    },
  },
};
export const Shadow: Story = {
  args: {
    children: 'Shadow',
    padding: {
      px: { xs: 80, sm: 100, md: 150 },
      py: { xs: 80, sm: 100, md: 150 },
    },
    radius: { xs: 50, sm: 20 },
    shadow: { xs: 'sm' },
  },
};
export const Backgorund: Story = {
  args: {
    children: 'Background',
    padding: {
      px: { xs: 80, sm: 100, md: 150 },
      py: { xs: 80, sm: 100, md: 150 },
    },
    background: 'secondary',
  },
};
