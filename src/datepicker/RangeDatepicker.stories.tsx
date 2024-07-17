/* eslint-disable  @typescript-eslint/no-explicit-any */

import {useEffect, useState} from 'react';
import type {Meta, ArgTypes} from '@storybook/react';

import {ArrowNavigationBackward} from 'icons';
import {RangeCalendarProps, RangeCalendarValue} from 'calendar';

import inputStory from 'input/Input.stories';
import calendarStory from 'calendar/RangeCalendar.stories';

import {RangeDatepicker as BaseDatepicker} from './Datepicker';
import {DatepickerProps, RangeDatepickerProps} from './types';

type CalendarStoryProps = {
  minDate: number;
  maxDate: number;
  disabledDates: boolean;
  tooltips: boolean;
};

type DatepickerStoryProps = {
  valueFrom: number;
  valueTo: number;
  startAdornment: boolean;
  onClearClick: boolean;
  format: string;
} & Omit<DatepickerProps, 'onClearClick'> &
  CalendarStoryProps;

export const RangeDatepicker: React.FC<DatepickerStoryProps> = props => {
  const [value, setValue] = useState<RangeCalendarValue>();

  const startAdornment = props.endAdornment ? <ArrowNavigationBackward /> : undefined;

  const calendarProps = {} as CalendarStoryProps;

  for (const prop in props) {
    if (!prop.startsWith('calendar')) {
      continue;
    }

    const propName = prop.replace('calendar.', '') as keyof RangeCalendarProps;
    const propValue = props[prop] as any;

    calendarProps[propName] = propValue;
  }

  const minDate = calendarProps.minDate ? new Date(calendarProps.minDate) : undefined;
  const maxDate = calendarProps.maxDate ? new Date(calendarProps.maxDate) : undefined;

  const disabledDates = calendarProps.disabledDates ? (date: Date) => date.getDate() % 2 === 0 : undefined;
  const tooltips = calendarProps.tooltips ? (date: Date) => date.toDateString() : undefined;

  const resultProps: RangeDatepickerProps = {
    ...props,

    value,
    startAdornment,
    onChange: setValue,
    calendar: {
      ...calendarProps,

      minDate,
      maxDate,
      disabledDates,
      tooltips,
    },
  };

  useEffect(() => {
    const newValue: RangeCalendarValue = value ? [...value] : [undefined, undefined];

    if (props.valueFrom) {
      newValue[0] = new Date(props.valueFrom);
    }

    if (props.valueTo) {
      newValue[1] = new Date(props.valueTo);
    }

    setValue(newValue);
  }, [props.valueFrom, props.valueTo]);

  return (
    <div>
      <BaseDatepicker {...resultProps} />

      <div style={{paddingTop: 20, opacity: 0.8, textAlign: 'center'}}>
        [{value?.map(val => val?.toISOString() ?? 'undefined').join(', ')}]
      </div>
    </div>
  );
};

const calendarProps = Object.entries(calendarStory.argTypes).reduce((acc, [code, value]) => {
  if (!['mode', 'viewDate', 'value', 'onChange', 'onChangeViewDate'].includes(code)) {
    acc[`calendar.${code}`] = value;
  }

  return acc;
}, {} as ArgTypes);

const meta = {
  title: 'Datepicker',
  component: RangeDatepicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    ...inputStory.commonArgTypes,
    ...calendarProps,

    valueFrom: {
      type: 'Date' as never,
      control: 'date',
      description: 'Начало диапазона',
    },

    valueTo: {
      type: 'Date' as never,
      control: 'date',
      description: 'Окончание диапазона',
    },
  },
  args: {
    label: 'Label',
    caption: 'hint',
    width: '248px',
  },
} satisfies Meta<typeof RangeDatepicker>;

export default meta;
