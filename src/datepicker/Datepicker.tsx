import {createContext, useState} from 'react';
import {startOfToday} from 'date-fns';

import {BaseCalendar, BaseCalendarProps, CalendarMode, RangeCalendarValue} from 'calendar';

import {DateInput} from './DateInput';
import {startOfDay} from './utils';
import {
  BaseDatepickerProps,
  DatepickerProps,
  RangeDatepickerProps,
  DatepickerContextProps,
  DEFAULT_FORMAT,
} from './types';

export const DatepickerContext = createContext<DatepickerContextProps>({} as never);

const BaseDatepicker: React.FC<BaseDatepickerProps> = props => {
  const {calendar, mode, value, onChange, referenceDate = startOfToday()} = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const calendarProps: BaseCalendarProps = {
    viewDate: value[0],

    ...calendar,

    mode,
    value,
    onChange,
  };
  console.log(calendarProps);
  const context: DatepickerContextProps = {
    ...props,

    isOpen,
    setIsOpen,
    referenceDate,
  };

  return (
    <DatepickerContext.Provider value={context}>
      <DateInput />
      {isOpen && <BaseCalendar {...calendarProps} />}
    </DatepickerContext.Provider>
  );
};

export const Datepicker: React.FC<DatepickerProps> = ({dateFormat, value, onChange, ...props}) => {
  const overrideProps = {
    mode: CalendarMode.single,

    dateFormat: dateFormat ?? DEFAULT_FORMAT,

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

  const format = `${props.dateFormat ?? DEFAULT_FORMAT} — ${props.dateFormat ?? DEFAULT_FORMAT}`;

  return <BaseDatepicker mode={CalendarMode.range} {...props} value={value} dateFormat={format} />;
};
