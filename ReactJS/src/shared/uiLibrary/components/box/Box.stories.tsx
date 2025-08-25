import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/internal/test';
import Box from './Box';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Box',
  component: Box,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    overflow: {
      options: ['hidden', 'scroll', 'clip', 'auto', 'visible'],
      control: { type: 'select' },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children: 'Box content',
    as: 'div',
    padding: 50,
    overflow: { x: { xs: 'scroll', sm: 'auto', md: 'visible' } },

    radius: {
      tl: { xs: 13 },
      br: { xs: 13 },
    },

    borderColor: 'success',
    borderWidth: 1,
    border: true,
    order: 1,
  },
};
export const BorderWidth5Px: Story = {
  args: {
    children: 'Box content',
    as: 'div',
    padding: 50,
    overflow: { x: { xs: 'scroll', sm: 'auto', md: 'visible' } },
    radius: 10,
    border: true,
    borderWidth: {
      xs: 5,
    },
    borderColor: 'info',
  },
};
export const BorderRadius: Story = {
  args: {
    children: 'Box content',
    as: 'div',
    padding: 50,
    overflow: { x: { xs: 'scroll', sm: 'auto', md: 'visible' } },
    radius: {
      tl: { xs: 12 },
      tr: { xs: 12, sm: 15 },
      bl: { xs: 14, sm: 18 },
      br: { xs: 16, sm: 18 },
    },

    borderWidth: {
      xs: 1,
    },
    borderColor: 'info',
  },
};
export const BorderBorderStyle: Story = {
  args: {
    children: 'Box content',
    as: 'div',
    padding: 50,
    overflow: { x: { xs: 'scroll', sm: 'auto', md: 'visible' } },
    radius: 12,

    borderWidth: 2,
    borderColor: 'info',
    borderStyle: 'dashed',
  },
};
export const BoxPosition: Story = {
  args: {
    children: 'Box content',
    as: 'div',
    padding: 50,
    overflow: { x: { xs: 'scroll', sm: 'auto', md: 'visible' } },
    radius: 12,

    borderWidth: 2,
    borderColor: 'info',
    borderStyle: 'dashed',
    position: 'relative',
  },
};
export const BoxShadow: Story = {
  args: {
    children: 'Box content',
    as: 'div',
    padding: 50,
    overflow: { x: { xs: 'scroll', sm: 'auto', md: 'visible' } },
    radius: 12,
    borderColor: 'transparent',
    position: 'relative',
    shadow: 'md',
  },
};
