import {BaseCalendarProps, CalendarMode, CalendarProps, RangeCalendarProps} from 'calendar';
import {InputProps} from 'input';

export const DEFAULT_FORMAT = 'дд.мм.гггг';

export type BaseDatepickerProps = {
  format: string;
  mode: CalendarMode;
  calendar: Omit<BaseCalendarProps, 'mode' | 'value' | 'onChange'>;
  referenceDate?: Date;
} & Omit<InputProps, 'mask' | 'value' | 'onChange' | 'onClearClick'> & Pick<BaseCalendarProps, 'value' | 'onChange'>;

export type DatepickerProps = {
  format?: string;
  calendar: Omit<CalendarProps, 'value' | 'onChange'>;
} & Omit<BaseDatepickerProps, 'format' | 'mode' | 'value' | 'onChange'> & Pick<CalendarProps, 'value' | 'onChange'>;

export type RangeDatepickerProps = {
  format?: string;
  calendar: Omit<RangeCalendarProps, 'value' | 'onChange'>;
} & Omit<BaseDatepickerProps, 'format' | 'mode' | 'value' | 'onChange'> & Pick<RangeCalendarProps, 'value' | 'onChange'>;

export type DatepickerContextProps = {
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
} & BaseDatepickerProps & Required<Pick<BaseDatepickerProps, 'referenceDate'>>;