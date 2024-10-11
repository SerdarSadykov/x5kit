import {createContext, useCallback, useMemo, useState} from 'react';
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
  const {referenceDate = startOfToday(), qa = 'datepicker'} = props;

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

    qa,
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

export const Datepicker: React.FC<DatepickerProps> = props => {
  const value = useMemo(() => [props.value ? startOfDay(props.value) : undefined, undefined], [props.value]);

  const onChange = useCallback<BaseDatepickerProps['onChange']>(
    newValue => props.onChange(newValue[0]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onChange]
  );

  const overrideProps = {
    ...props,

    value,
    onChange,

    mode: CalendarMode.single,

    formatStr: props.formatStr ?? DEFAULT_FORMAT,
  } as BaseDatepickerProps;

  return <BaseDatepicker {...overrideProps} />;
};

export const RangeDatepicker: React.FC<RangeDatepickerProps> = props => {
  const value = useMemo<RangeCalendarValue>(() => {
    const [rangeStart, rangeEnd] = props.value ?? [];

    return [rangeStart ? startOfDay(rangeStart) : undefined, rangeEnd ? startOfDay(rangeEnd) : undefined];
  }, [props.value]);

  const format = `${props.formatStr ?? DEFAULT_FORMAT} — ${props.formatStr ?? DEFAULT_FORMAT}`;

  return <BaseDatepicker mode={CalendarMode.range} {...props} value={value} formatStr={format} />;
};
