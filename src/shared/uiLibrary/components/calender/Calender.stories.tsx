import type { EventType } from "@/shared/uiLibrary/utils/types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/internal/test";
import Calender from "./Calender";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Calender",
  component: Calender,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Calender>;

export default meta;
type Story = StoryObj<typeof Calender>;
const eidHolidays: EventType[] = Array.from({ length: 8 }, (_, i) => {
  const day = 5 + i; // 5,6,7,...12
  const dateStr = `2025-06-${String(day).padStart(2, "0")}`;
  return { date: dateStr, label: "Eid Holiday", type: "holiday" };
});
export const Default: Story = {
  args: {
    monthsToShow: 2,
    events: [
      ...eidHolidays,
      { date: "2025-12-25", label: "Borodin 🎄", type: "holiday" },
      { date: "2025-12-20", label: "Al Amin Birthday 🎂", type: "birthday" },
      { date: "2025-08-21", label: "Team Meeting", type: "meeting" },
    ]
  },
};
export const SelectedRange: Story = {
  args: {
    monthsToShow: 2,
    events: [
      ...eidHolidays,
      { date: "2025-12-25", label: "Borodin 🎄", type: "holiday" },
      { date: "2025-12-20", label: "Al Amin Birthday 🎂", type: "birthday" },
      { date: "2025-08-21", label: "Team Meeting", type: "meeting" },
    ],
  },
};
export const SelectedDate: Story = {
  args: {
    monthsToShow: 2,
    events: [
      ...eidHolidays,
      { date: "2025-12-25", label: "Borodin 🎄", type: "holiday" },
      { date: "2025-12-20", label: "Al Amin Birthday 🎂", type: "birthday" },
      { date: "2025-08-21", label: "Team Meeting", type: "meeting" },
    ],
    allowRange: false,

  },
};
