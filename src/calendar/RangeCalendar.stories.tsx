import {useEffect, useState} from 'react';
import type {Meta} from '@storybook/react';

import {RangeCalendar as BaseRangeCalendar} from './Calendar';
import {RangeCalendarProps, RangeCalendarValue} from './types';
import calendarMeta from './Calendar.stories';

type RangeComponentProps = {
  valueFrom: number;
  valueTo: number;
  viewDate: number;
  minDate: number;
  maxDate: number;
  disabledDates: boolean;
  onChange: boolean;
  onChangeViewDate: boolean;
};

export const RangeCalendar: React.FC<
  RangeComponentProps & Omit<RangeCalendarProps, keyof RangeComponentProps>
> = props => {
  const propsViewDate = props.viewDate ? new Date(props.viewDate) : new Date();

  const minDate = props.minDate ? new Date(props.minDate) : undefined;
  const maxDate = props.maxDate ? new Date(props.maxDate) : undefined;

  const [value, setValue] = useState<RangeCalendarValue>();
  const [viewDate, setViewDate] = useState<Date>(propsViewDate);

  const disabledDates = props.disabledDates ? (date: Date) => date.getDate() % 2 === 0 : undefined;
  const onChangeViewDate = props.onChangeViewDate ? (date: Date) => alert(date.toString()) : undefined;
  const onChange = props.onChange ? (date?: RangeCalendarValue) => alert(date?.toString()) : undefined;
  const tooltips = props.tooltips ? (date: Date) => date.toDateString() : undefined;

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

  useEffect(() => {
    if (props.viewDate) {
      setViewDate(new Date(props.viewDate));
    }
  }, [props.viewDate]);

  useEffect(() => {
    onChangeViewDate?.(viewDate);
  }, [viewDate]);

  useEffect(() => {
    onChange?.(value);
  }, [value]);

  const calendarProps = {
    ...props,

    value,
    viewDate,
    minDate,
    maxDate,
    disabledDates,
    tooltips,
    onChange: setValue,
    onChangeViewDate: setViewDate,
  };

  return <BaseRangeCalendar {...calendarProps} />;
};

const valueTo = new Date();
valueTo.setDate(valueTo.getDate() + 5);

const meta = {
  title: 'Calendar',
  component: RangeCalendar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    ...calendarMeta.argTypes,

    value: {
      type: '[Date | undefined, Date | undefined]' as never,
      description: 'Выбранная дата',
    },

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
    valueFrom: new Date().getTime(),
    valueTo: valueTo.getTime(),
    viewDate: new Date().getTime(),
    weekStartsOn: 1,
    blocks: 1,
  },
} satisfies Meta<typeof RangeCalendar>;

export default meta;
