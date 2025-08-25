import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/internal/test';
import { Button } from '../button';
import ButtonGroup from './ButtonGroup';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/ButtonGroup',
  component: ButtonGroup,
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
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {
    alignment: 'center',
    children: (
      <>
        <Button variant="fill" color="primary">
          Primary
        </Button>
        <Button variant="fill" color="secondary">
          Secondary
        </Button>
        <Button variant="fill" color="success">
          Success
        </Button>
        <Button variant="fill" color="info">
          Info
        </Button>
        <Button variant="plain" color="info">
          Info plain
        </Button>
        <Button variant="solid" color="info">
          Info solid
        </Button>
        <Button variant="fill" color="warning">
          Warning
        </Button>
        <Button variant="fill" color="danger">
          Danger
        </Button>
        <Button variant="outline" color="danger">
          Danger outline
        </Button>
        <Button variant="plain" color="danger">
          Danger plain
        </Button>
        <Button variant="solid" color="danger">
          Danger solid
        </Button>
        <Button variant="fill" color="blue">
          Blue
        </Button>
        <Button variant="link" color="blue">
          Link button
        </Button>
        <Button variant="outline" color="blue">
          Blue Outline
        </Button>
      </>
    ),
  },
};
