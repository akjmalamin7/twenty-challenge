import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/internal/test';
import Checkbox from './Checkbox';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Checkbox',
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
    name: 'primary',
    checked: true,
  },
};
export const Secondary: Story = {
  args: {
    label: 'Secondary',
    variant: 'secondary',
    name: 'secondary',
    checked: true,
  },
};
export const Tertiary: Story = {
  args: {
    label: 'Tertiary',
    variant: 'tertiary',
    name: 'tertiary',
    checked: true,
  },
};
export const Success: Story = {
  args: {
    label: 'Success',
    variant: 'success',
    name: 'success',
    checked: true,
  },
};
export const Info: Story = {
  args: {
    label: 'Info',
    variant: 'info',
    name: 'info',
    checked: true,
  },
};
export const Danger: Story = {
  args: {
    label: 'Danger',
    variant: 'danger',
    name: 'danger',
    checked: true,
  },
};
export const White: Story = {
  args: {
    label: 'White',
    variant: 'white',
    name: 'white',
    checked: true,
  },
};
export const Blue: Story = {
  args: {
    label: 'Blue',
    variant: 'blue',
    name: 'blue',
    checked: true,
  },
};
