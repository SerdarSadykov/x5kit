/* eslint-disable  @typescript-eslint/no-explicit-any */

import {useEffect, useState} from 'react';
import type {Meta} from '@storybook/react';

import {ArrowNavigationBackward} from 'icons';
import {RangeCalendarValue} from 'calendar';

import inputStory from 'input/Input.stories';

import {RangeDatepicker as BaseDatepicker} from './Datepicker';
import datepickerStory from './Datepicker.stories';
import {DatepickerProps, RangeDatepickerProps} from './types';

type DatepickerStoryProps = {
  valueFrom: number;
  valueTo: number;
  startAdornment: boolean;
  onClearClick: boolean;
  format: string;
  calendar: {
    minDate: number;
    maxDate: number;
    disabledDates: boolean;
    tooltips: boolean;
  };
} & Omit<DatepickerProps, 'onClearClick'>;

export const RangeDatepicker: React.FC<DatepickerStoryProps> = props => {
  const [value, setValue] = useState<RangeCalendarValue>();

  const startAdornment = props.startAdornment ? <ArrowNavigationBackward /> : undefined;

  const resultProps: RangeDatepickerProps = {
    ...props,

    value,
    startAdornment,
    onChange: setValue,
    calendarProps: datepickerStory['parseCalendarProps'](props),
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
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <BaseDatepicker {...resultProps} />

      <div style={{paddingTop: 20, opacity: 0.8, textAlign: 'center'}}>
        [{value?.map(val => val?.toLocaleString() ?? 'undefined').join(', ')}]
      </div>
    </div>
  );
};

const meta = {
  title: 'Datepicker',
  component: RangeDatepicker,
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
    ...datepickerStory['calendarProps'],

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
