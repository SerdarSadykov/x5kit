import {UseFloatingReturn, UseInteractionsReturn} from '@floating-ui/react';

import {BaseCalendarProps, CalendarProps, RangeCalendarProps} from 'calendar';
import {InputProps} from 'input';

export const DEFAULT_FORMAT = 'дд.мм.гггг';

export type BaseDatepickerProps = {
  isOpen?: boolean;
  setIsOpen?: (newIsOpen: boolean) => void;

  formatStr: string;

  calendarProps: Omit<BaseCalendarProps, 'mode' | 'value' | 'onChange'>;

  referenceDate?: Date;
} & Omit<InputProps, 'mask' | 'value' | 'onChange' | 'onClearClick'> & Pick<BaseCalendarProps, 'mode' | 'value' | 'onChange'>;

export type DatepickerProps = {
  formatStr?: string;
  calendarProps: Omit<CalendarProps, 'value' | 'onChange'>;
} & Omit<BaseDatepickerProps, 'formatStr' | 'mode' | 'value' | 'onChange'> & Pick<CalendarProps, 'value' | 'onChange'>;

export type RangeDatepickerProps = {
  formatStr?: string;
  calendarProps: Omit<RangeCalendarProps, 'value' | 'onChange'>;
} & Omit<BaseDatepickerProps, 'formatStr' | 'mode' | 'value' | 'onChange'> & Pick<RangeCalendarProps, 'value' | 'onChange'>;

export type DatepickerContextProps = {
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
  floating: UseFloatingReturn;
} & BaseDatepickerProps & Required<Pick<BaseDatepickerProps, 'referenceDate'>>;