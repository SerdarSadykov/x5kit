import {createContext, useState} from 'react';
import {offset, useFloating} from '@floating-ui/react';
import {startOfToday} from 'date-fns';

import {startOfDay} from 'common';

import {CalendarMode} from 'Calendar';

import {DateInput} from './DateInput';
import {Calendar} from './Calendar';

import {DEFAULT_FORMAT} from './types';

import type {BaseDatepickerProps, DatepickerProps, RangeDatepickerProps, DatepickerContextProps} from './types';
import type {RangeCalendarValue} from 'Calendar';

export const DatepickerContext = createContext<DatepickerContextProps>({} as never);

const BaseDatepicker: React.FC<BaseDatepickerProps> = props => {
  const {referenceDate = startOfToday()} = props;

  const [isOpenIn, setIsOpenIn] = useState<boolean>(false);
  const isOpen = props.isOpen ?? isOpenIn;
  const setIsOpen = props.setIsOpen ?? setIsOpenIn;

  const onOpenChange = (newIsOpen: boolean) => {
    setIsOpen(newIsOpen);

    if (newIsOpen) {
      floating.update?.();
    }
  };

  const floating = useFloating({
    onOpenChange,
    placement: 'bottom',
    middleware: [offset(10)],
    open: isOpen,
  });

  const context: DatepickerContextProps = {
    ...props,

    floating,
    isOpen,
    referenceDate,
    setIsOpen: onOpenChange,
  };

  return (
    <DatepickerContext.Provider value={context}>
      <DateInput />
      <Calendar />
    </DatepickerContext.Provider>
  );
};

export const Datepicker: React.FC<DatepickerProps> = ({formatStr, value, onChange, ...props}) => {
  const overrideProps = {
    mode: CalendarMode.single,

    formatStr: formatStr ?? DEFAULT_FORMAT,

    value: [value ? startOfDay(value) : undefined, undefined],

    onChange: newValue => onChange(newValue[0]),
  } as BaseDatepickerProps;

  return <BaseDatepicker {...props} {...overrideProps} />;
};

export const RangeDatepicker: React.FC<RangeDatepickerProps> = props => {
  const [rangeStart, rangeEnd] = props.value ?? [];

  const value: RangeCalendarValue = [
    rangeStart ? startOfDay(rangeStart) : undefined,
    rangeEnd ? startOfDay(rangeEnd) : undefined,
  ];

  const format = `${props.formatStr ?? DEFAULT_FORMAT} — ${props.formatStr ?? DEFAULT_FORMAT}`;

  return <BaseDatepicker mode={CalendarMode.range} {...props} value={value} formatStr={format} />;
};
