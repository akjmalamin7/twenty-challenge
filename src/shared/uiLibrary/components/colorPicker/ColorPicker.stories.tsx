import type { Meta, StoryObj } from '@storybook/react-vite';
import ColorPicker from './ColorPicker';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof ColorPicker> = {
  title: 'Example/ColorPicker',
  component: ColorPicker,
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
  // args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    showGradientStops: false,
    showHexField: true,
    showRgbaField: false,
    showAngleField: false,
    showLinearField: false,
    showRadialField: false,
  },
};
