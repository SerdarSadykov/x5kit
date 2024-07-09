import {useState} from 'react';

import {Calendar as CalendarComponent, CalendarProps} from 'calendar';

import {DatepickerProps} from './types';
import {DateInput} from './DateInput';

export const Datepicker: React.FC<DatepickerProps> = props => {
  const {value, onChange, calendar} = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const calendarProps: CalendarProps = {
    ...calendar,

    value,
    viewDate: value ?? undefined,
    onChange,
  };

  const inputProps = {
    ...props,

    isOpen,
    setIsOpen,
  }

  return (
    <>
      <DateInput {...inputProps} />
      {isOpen && <CalendarComponent {...calendarProps} />}
    </>
  );
};
