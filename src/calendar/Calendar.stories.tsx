import {useEffect, useState} from 'react';
import type {Meta} from '@storybook/react';

import {Calendar} from './Calendar';
import {CalendarProps, CalendarValue} from './types';

export const Component: React.FC<CalendarProps> = props => {
  const propsViewDate = props.viewDate ? new Date(props.viewDate) : new Date();

  const minDate = props.minDate ? new Date(props.minDate) : undefined;
  const maxDate = props.maxDate ? new Date(props.maxDate) : undefined;

  const [value, setValue] = useState<CalendarValue>();
  const [viewDate, setViewDate] = useState<Date>(propsViewDate);

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

  return (
    <Calendar
      {...props}
      value={value}
      onChange={setValue}
      onChangeViewDate={setViewDate}
      viewDate={viewDate}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
};

const meta = {
  title: 'Calendar',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      type: 'Date' as never,
      control: 'date',
      description: 'Выбранная дата',
    },

    onChange: {
      type: '(newValue: Date | undefined) => void' as never,
      description: 'Обработчик изменения',
    },

    viewDate: {
      type: 'Date' as never,
      control: 'date',
      description: 'Фокус на дату',
    },

    onChangeViewDate: {
      type: '(newViewDate: Date) => void' as never,
      description: 'Обработчик смены фокуса',
    },

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
    },

    qa: {type: 'string', control: 'text'},
  },

  args: {
    value: new Date(),
    viewDate: new Date(),
    weekStartsOn: 1,
    blocks: 1,
  },
} satisfies Meta<typeof Calendar>;

export default meta;
