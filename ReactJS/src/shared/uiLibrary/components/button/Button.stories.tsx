import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/internal/test';
import Button from './Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    color: {
      options: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'danger',
        'white',
        'blue',
      ],
      control: { type: 'select' },
    },
    variant: {
      options: ['solid', 'fill', 'outline', 'plain', 'link'],
      control: { type: 'select' },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    color: 'primary',
    variant: 'fill',
    children: 'Primary',
  },
};
export const Secondary: Story = {
  args: {
    color: 'secondary',
    variant: 'fill',
    children: 'Secondary',
  },
};

export const Success: Story = {
  args: {
    color: 'success',
    variant: 'fill',
    children: 'Success',
  },
};
export const Info: Story = {
  args: {
    color: 'info',
    variant: 'fill',
    children: 'Info',
  },
};
export const Warning: Story = {
  args: {
    color: 'warning',
    variant: 'fill',
    children: 'Warning',
  },
};
export const Danger: Story = {
  args: {
    color: 'danger',
    variant: 'fill',
    children: 'Danger',
  },
};
export const White: Story = {
  args: {
    color: 'white',
    variant: 'fill',
    children: 'White',
  },
};
export const Blue: Story = {
  args: {
    color: 'blue',
    variant: 'fill',
    children: 'Blue',
  },
};
export const SolidButton: Story = {
  args: {
    variant: 'solid',
    children: 'Solid',
  },
};
export const OutlineButton: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};
export const FillButton: Story = {
  args: {
    variant: 'fill',
    children: 'Fill',
  },
};
export const PlainButton: Story = {
  args: {
    variant: 'plain',
    children: 'Plain',
  },
};
export const LinkButton: Story = {
  args: {
    variant: 'link',
    children: 'LinkButton',
  },
};

export const DisabledButton: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};
export const BlockButton: Story = {
  args: {
    block: true,
    children: 'Button Width',
  },
};
export const ButtonWithIcon: Story = {
  args: {
    icon: '→',
    children: 'Button',
  },
};
