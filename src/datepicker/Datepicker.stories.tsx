/* eslint-disable  @typescript-eslint/no-explicit-any */

import {useEffect, useState} from 'react';
import type {Meta} from '@storybook/react';

import {ArrowNavigationBackward} from 'icons';
import {CalendarProps, CalendarValue} from 'calendar';

import inputStory from 'input/Input.stories';
import calendarStory from 'calendar/Calendar.stories';

import {Datepicker as BaseDatepicker} from './Datepicker';
import {DatepickerProps} from './types';

type DatepickerStoryProps = {
  startAdornment: boolean;
  onClearClick: boolean;
  format: string;
  calendar: {
    minDate: number;
    maxDate: number;
    disabledDates: boolean;
    tooltips: boolean;
  };
} & Omit<DatepickerProps, 'onClearClick' | 'calendar'>;

const calendarProps = Object.entries(calendarStory['commonArgTypes']).reduce((acc, [code, value]) => {
  acc[`calendar.${code}`] = value;
  return acc;
}, {});

const parseCalendarProps = (props: DatepickerStoryProps) => {
  const calendarProps = {} as DatepickerStoryProps['calendar'];

  for (const prop in props) {
    if (!prop.startsWith('calendar')) {
      continue;
    }

    const propName = prop.replace('calendar.', '') as keyof CalendarProps;
    const propValue = props[prop] as any;

    calendarProps[propName] = propValue;
  }

  const minDate = calendarProps.minDate ? new Date(calendarProps.minDate) : undefined;
  const maxDate = calendarProps.maxDate ? new Date(calendarProps.maxDate) : undefined;

  const disabledDates = calendarProps.disabledDates ? (date: Date) => date.getDate() % 2 === 0 : undefined;
  const tooltips = calendarProps.tooltips ? (date: Date) => date.toDateString() : undefined;

  return {
    ...calendarProps,

    minDate,
    maxDate,
    disabledDates,
    tooltips,
  };
};

export const Datepicker: React.FC<DatepickerStoryProps> = props => {
  const [value, setValue] = useState<CalendarValue>();

  const startAdornment = props.startAdornment ? <ArrowNavigationBackward /> : undefined;

  const resultProps: DatepickerProps = {
    ...props,

    value,
    startAdornment,
    onChange: setValue,
    calendarProps: parseCalendarProps(props),
  };

  useEffect(() => {
    if (props.value) {
      setValue(new Date(props.value));
    }
  }, [props.value]);

  return (
    <div>
      <BaseDatepicker {...resultProps} />

      <div style={{paddingTop: 20, opacity: 0.8, textAlign: 'center'}}>{value?.toISOString()}</div>
    </div>
  );
};

const meta = {
  calendarProps,
  parseCalendarProps,

  title: 'Datepicker',
  component: Datepicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    formatStr: {
      type: 'string',
      control: 'text',
      description: 'Формат (поддержка д|d|м|m|г|y)',
    },

    ...inputStory['commonArgTypes'],
    ...calendarProps,
  },
  args: {
    label: 'Label',
    caption: 'hint',
    width: '248px',
  },
} as Meta<typeof Datepicker>;

export default meta;
