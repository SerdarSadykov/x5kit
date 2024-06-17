import React, {useState} from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import {Calendar} from './Calendar';
import {CalendarValue} from './types';

const minDate = new Date();
minDate.setFullYear(2024);
minDate.setMonth(4);
minDate.setHours(0);
minDate.setMinutes(0);
minDate.setSeconds(0);
minDate.setMilliseconds(0);

const maxDate = new Date();
maxDate.setFullYear(2024);
maxDate.setMonth(8);
maxDate.setHours(0);
maxDate.setMinutes(0);
maxDate.setSeconds(0);
maxDate.setMilliseconds(0);

export const Component = () => {
  const [value, setValue] = useState<CalendarValue>();

  return (
    <Calendar
      value={value}
      onChange={setValue}
      blocks={2}
      viewDate={minDate}
      // freezeRange={CalendarFreezeRange.start}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Calendar',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
