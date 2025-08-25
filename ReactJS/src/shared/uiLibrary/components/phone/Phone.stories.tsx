import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import Phone from "./Phone";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Phone",
  component: Phone,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
    label: { control: "text" },
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: "select" },
    },
  },

  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Phone>;

export default meta;
type Story = StoryObj<typeof Phone>;

export const Default: Story = {
  args: {
    size: "sm",
    value: {
      country: "64f5728b0e5ba2693d02f97c",
      phone: "+8801780742255"
    },
    label: "Phone",
    countries: [
      {
        _id: "64f5728b0e5ba2693d02f971",
        name: "Afghanistan",
        flag: "https://static.soppiya.com/icons/flags/AF.svg",
        phone: {
          _id: "64f59c4c6e0072607ff13e08",
          dialing_code: "+93",
          format: "+93 XXX XXX XXX"
        }
      },
      {
        _id: "64f5728b0e5ba2693d02f972",
        name: "Albania",
        flag: "https://static.soppiya.com/icons/flags/AL.svg",
        phone: {
          _id: "64f59c456e0072607ff13d0c",
          dialing_code: "+355",
          format: "+355 XX XXX XXXX"
        }
      },
      {
        _id: "64f5728b0e5ba2693d02f97c",
        name: "Bangladesh",
        flag: "https://static.soppiya.com/icons/flags/BD.svg",
        phone: {
          _id: "64f59c4c6e0072607ff13df9",
          dialing_code: "+880",
          format: "+880 1XXX XXXXXX"
        }
      },
    ]
  },
};
export const Loading: Story = {
  args: {
    size: "sm",
    value: {
      country: "64f5728b0e5ba2693d02f97c",
      phone: "+8801780742255"
    },
    label: "Phone",
    loading: true,
    countries: [
      {
        _id: "64f5728b0e5ba2693d02f971",
        name: "Afghanistan",
        flag: "https://static.soppiya.com/icons/flags/AF.svg",
        phone: {
          _id: "64f59c4c6e0072607ff13e08",
          dialing_code: "+93",
          format: "+93 XXX XXX XXX"
        }
      },
      {
        _id: "64f5728b0e5ba2693d02f972",
        name: "Albania",
        flag: "https://static.soppiya.com/icons/flags/AL.svg",
        phone: {
          _id: "64f59c456e0072607ff13d0c",
          dialing_code: "+355",
          format: "+355 XX XXX XXXX"
        }
      },
      {
        _id: "64f5728b0e5ba2693d02f97c",
        name: "Bangladesh",
        flag: "https://static.soppiya.com/icons/flags/BD.svg",
        phone: {
          _id: "64f59c4c6e0072607ff13df9",
          dialing_code: "+880",
          format: "+880 1XXX XXXXXX"
        }
      },
    ]
  },
};
export const HelpMessage: Story = {
  args: {
    size: "sm",
    value: {
      country: "64f5728b0e5ba2693d02f97c",
      phone: "+8801780742255"
    },
    label: "Phone",
    helpText: "Help message",
    countries: [
      {
        _id: "64f5728b0e5ba2693d02f971",
        name: "Afghanistan",
        flag: "https://static.soppiya.com/icons/flags/AF.svg",
        phone: {
          _id: "64f59c4c6e0072607ff13e08",
          dialing_code: "+93",
          format: "+93 XXX XXX XXX"
        }
      },
      {
        _id: "64f5728b0e5ba2693d02f972",
        name: "Albania",
        flag: "https://static.soppiya.com/icons/flags/AL.svg",
        phone: {
          _id: "64f59c456e0072607ff13d0c",
          dialing_code: "+355",
          format: "+355 XX XXX XXXX"
        }
      },
      {
        _id: "64f5728b0e5ba2693d02f97c",
        name: "Bangladesh",
        flag: "https://static.soppiya.com/icons/flags/BD.svg",
        phone: {
          _id: "64f59c4c6e0072607ff13df9",
          dialing_code: "+880",
          format: "+880 1XXX XXXXXX"
        }
      },
    ]
  },
};
export const ErrorMessage: Story = {
  args: {
    size: "sm",
    value: {
      country: "64f5728b0e5ba2693d02f97c",
      phone: "+8801780742255"
    },
    label: "Phone",
    error: {
      status: true,
      message: "Something went wrong"
    },
    countries: [
      {
        _id: "64f5728b0e5ba2693d02f971",
        name: "Afghanistan",
        flag: "https://static.soppiya.com/icons/flags/AF.svg",
        phone: {
          _id: "64f59c4c6e0072607ff13e08",
          dialing_code: "+93",
          format: "+93 XXX XXX XXX"
        }
      },
      {
        _id: "64f5728b0e5ba2693d02f972",
        name: "Albania",
        flag: "https://static.soppiya.com/icons/flags/AL.svg",
        phone: {
          _id: "64f59c456e0072607ff13d0c",
          dialing_code: "+355",
          format: "+355 XX XXX XXXX"
        }
      },
      {
        _id: "64f5728b0e5ba2693d02f97c",
        name: "Bangladesh",
        flag: "https://static.soppiya.com/icons/flags/BD.svg",
        phone: {
          _id: "64f59c4c6e0072607ff13df9",
          dialing_code: "+880",
          format: "+880 1XXX XXXXXX"
        }
      },
    ]
  },
};
export const PhoneDisabled: Story = {
  args: {
    size: "sm",
    value: {
      country: "64f5728b0e5ba2693d02f97c",
      phone: "+8801780742255"
    },
    label: "Phone",
    disabled: true,
    countries: [
      {
        _id: "64f5728b0e5ba2693d02f971",
        name: "Afghanistan",
        flag: "https://static.soppiya.com/icons/flags/AF.svg",
        phone: {
          _id: "64f59c4c6e0072607ff13e08",
          dialing_code: "+93",
          format: "+93 XXX XXX XXX"
        }
      },
      {
        _id: "64f5728b0e5ba2693d02f972",
        name: "Albania",
        flag: "https://static.soppiya.com/icons/flags/AL.svg",
        phone: {
          _id: "64f59c456e0072607ff13d0c",
          dialing_code: "+355",
          format: "+355 XX XXX XXXX"
        }
      },
      {
        _id: "64f5728b0e5ba2693d02f97c",
        name: "Bangladesh",
        flag: "https://static.soppiya.com/icons/flags/BD.svg",
        phone: {
          _id: "64f59c4c6e0072607ff13df9",
          dialing_code: "+880",
          format: "+880 1XXX XXXXXX"
        }
      },
    ]
  },
};
export const PhoneReadOnly: Story = {
  args: {
    size: "sm",
    value: {
      country: "64f5728b0e5ba2693d02f97c",
      phone: "+8801780742255"
    },
    label: "Phone",
    readOnly: true,
    countries: [
      {
        _id: "64f5728b0e5ba2693d02f971",
        name: "Afghanistan",
        flag: "https://static.soppiya.com/icons/flags/AF.svg",
        phone: {
          _id: "64f59c4c6e0072607ff13e08",
          dialing_code: "+93",
          format: "+93 XXX XXX XXX"
        }
      },
      {
        _id: "64f5728b0e5ba2693d02f972",
        name: "Albania",
        flag: "https://static.soppiya.com/icons/flags/AL.svg",
        phone: {
          _id: "64f59c456e0072607ff13d0c",
          dialing_code: "+355",
          format: "+355 XX XXX XXXX"
        }
      },
      {
        _id: "64f5728b0e5ba2693d02f97c",
        name: "Bangladesh",
        flag: "https://static.soppiya.com/icons/flags/BD.svg",
        phone: {
          _id: "64f59c4c6e0072607ff13df9",
          dialing_code: "+880",
          format: "+880 1XXX XXXXXX"
        }
      },
    ]
  },
};
