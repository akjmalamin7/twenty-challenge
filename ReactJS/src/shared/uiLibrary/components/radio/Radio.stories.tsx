import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/internal/test';
import Radio from './Radio';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Radio',
  component: Radio,
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
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof Radio>;

export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
    name: 'primary',
    // checked: true,
  },
};
export const Secondary: Story = {
  args: {
    label: 'Secondary',
    variant: 'secondary',
    name: 'secondary',
  },
};
export const Tertiary: Story = {
  args: {
    label: 'Tertiary',
    variant: 'tertiary',
    name: 'tertiary',
  },
};
export const Success: Story = {
  args: {
    label: 'Success',
    variant: 'success',
    name: 'success',
  },
};
export const Info: Story = {
  args: {
    label: 'Info',
    variant: 'info',
    name: 'info',
  },
};
export const Danger: Story = {
  args: {
    label: 'Danger',
    variant: 'danger',
    name: 'danger',
  },
};
export const White: Story = {
  args: {
    label: 'White',
    variant: 'white',
    name: 'white',
  },
};
export const Blue: Story = {
  args: {
    label: 'Blue',
    variant: 'blue',
    name: 'blue',
  },
};
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    variant: 'blue',
    name: 'disabled',
    disabled: true,
  },
};
