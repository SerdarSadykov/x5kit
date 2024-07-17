/* eslint-disable  @typescript-eslint/no-explicit-any */

import {useEffect, useState} from 'react';
import type {Meta, ArgTypes} from '@storybook/react';

import {ArrowNavigationBackward} from 'icons';
import {CalendarProps, CalendarValue} from 'calendar';

import inputStory from 'input/Input.stories';
import calendarStory from 'calendar/Calendar.stories';

import {Datepicker as BaseDatepicker} from './Datepicker';
import {DatepickerProps} from './types';

type CalendarStoryProps = {
  viewDate: number;
  minDate: number;
  maxDate: number;
  disabledDates: boolean;
  onChangeViewDate: boolean;
  tooltips: boolean;
};

type DatepickerStoryProps = {
  startAdornment: boolean;
  onClearClick: boolean;
  format: string;
} & Omit<DatepickerProps, 'onClearClick'> &
  CalendarStoryProps;

export const Datepicker: React.FC<DatepickerStoryProps> = props => {
  const [value, setValue] = useState<CalendarValue>();

  const [viewDate, setViewDate] = useState<Date>();

  const startAdornment = props.endAdornment ? <ArrowNavigationBackward /> : undefined;

  const calendarProps = {} as CalendarStoryProps;

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
  const onChangeViewDate = calendarProps.onChangeViewDate ? (date: Date) => alert(date.toString()) : undefined;
  const tooltips = calendarProps.tooltips ? (date: Date) => date.toDateString() : undefined;

  const resultProps: DatepickerProps = {
    ...props,

    value,
    startAdornment,
    onChange: setValue,
    calendar: {
      ...calendarProps,

      viewDate,
      minDate,
      maxDate,
      disabledDates,
      tooltips,
      onChangeViewDate,
    },
  };

  useEffect(() => {
    if (props.value) {
      setValue(new Date(props.value));
    }
  }, [props.value]);

  useEffect(() => {
    if (props.viewDate) {
      setViewDate(new Date(props.viewDate));
    }
  }, [props.viewDate]);

  return <BaseDatepicker {...resultProps} />;
};

const calendarProps = Object.entries(calendarStory.argTypes).reduce((acc, [code, value]) => {
  if (!['mode', 'value', 'onChange'].includes(code)) {
    acc[`calendar.${code}`] = value;
  }

  return acc;
}, {} as ArgTypes);

const meta = {
  title: 'Datepicker',
  component: Datepicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    ...inputStory.commonArgTypes,
    ...calendarProps,
  },
  args: {
    label: 'Label',
    caption: 'hint',
    width: '248px',
  },
} satisfies Meta<typeof Datepicker>;

export default meta;
