import {useEffect, useState} from 'react';
import type {ArgTypes, Meta} from '@storybook/react';

import {Calendar as BaseCalendar} from './Calendar';
import type {CalendarProps, CalendarValue} from './types';
import type {DayProps} from './Days';

type CalendarStoryProps = {
  value: number;
  viewDate: number;
  minDate: number;
  maxDate: number;
  disabledDates: boolean;
  onChange: boolean;
  onChangeViewDate: boolean;
  tooltips: boolean;
};

export const Calendar: React.FC<CalendarStoryProps & Omit<CalendarProps, keyof CalendarStoryProps>> = props => {
  const propsViewDate = props.viewDate ? new Date(props.viewDate) : new Date();

  const minDate = props.minDate ? new Date(props.minDate) : undefined;
  const maxDate = props.maxDate ? new Date(props.maxDate) : undefined;

  const [value, setValue] = useState<CalendarValue>();
  const [viewDate, setViewDate] = useState<Date>(propsViewDate);

  const disabledDates = props.disabledDates ? (date: Date) => date.getDate() % 2 === 0 : undefined;
  const onChangeViewDate = props.onChangeViewDate ? (date: Date) => alert(date.toString()) : undefined;
  const onChange = props.onChange ? (date: CalendarValue) => alert(date?.toString()) : undefined;
  const tooltips = props.tooltips ? ({date}: DayProps) => date.toDateString() : undefined;

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

  return <BaseCalendar {...calendarProps} />;
};

const commonArgTypes: ArgTypes = {
  minDate: {
    type: 'Date' as never,
    control: 'date',
    description: 'Левая граница',
  },

  maxDate: {
    type: 'Date' as never,
    control: 'date',
    description: 'Правая граница',
  },

  disabledDates: {
    type: '(date: Date) => boolean' as never,
    control: 'boolean',
    description: 'Обработчик недоступных дат',
  },

  weekStartsOn: {
    description: 'Начало недели',
    control: {
      type: 'select',
      labels: {
        0: 'Воскресенье',
        1: 'Понедельник',
        2: 'Вторник',
        3: 'Среда',
        4: 'Четверг',
        5: 'Пятница',
        6: 'Суббота',
      },
    },
    options: [1, 2, 3, 4, 5, 6, 0],
    table: {
      defaultValue: {
        summary: 'Понедельник',
      },
    },
  },

  blocks: {
    description: 'Кол-во календарей',
    control: {
      type: 'number',
      min: 1,
      max: 3,
    },
    table: {
      defaultValue: {
        summary: '1',
      },
    },
  },

  tooltips: {
    type: '(date: Date) => ReactNode | string' as never,
    description: 'Обработчик подсказки',
    control: 'boolean',
  },

  qa: {type: 'string', control: 'text'},
};

const meta = {
  commonArgTypes,

  title: 'Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      type: 'Date' as never,
      control: 'date',
      description: 'Выбранная дата',
    },

    viewDate: {
      type: 'Date' as never,
      control: 'date',
      description: 'Фокус на дату',
    },

    ...commonArgTypes,

    onChange: {
      type: '(newValue: Date | undefined) => void' as never,
      control: 'boolean',
      description: 'Обработчик изменения',
    },

    onChangeViewDate: {
      type: '(newViewDate: Date) => void' as never,
      control: 'boolean',
      description: 'Обработчик смены фокуса',
    },
  },
  args: {
    value: new Date().getTime(),
    viewDate: new Date().getTime(),
    weekStartsOn: 1,
    blocks: 1,
  },
} as Meta<typeof Calendar>;

export default meta;
