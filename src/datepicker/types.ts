import {BaseCalendarProps, CalendarProps, RangeCalendarProps} from 'calendar';
import {InputProps} from 'input';

export const DEFAULT_FORMAT = 'дд.мм.гггг';

export type BaseDatepickerProps = {
  dateFormat: string;
  calendar: Omit<BaseCalendarProps, 'mode' | 'value' | 'onChange'>;
  referenceDate?: Date;
} & Omit<InputProps, 'mask' | 'value' | 'onChange' | 'onClearClick'> & Pick<BaseCalendarProps, 'mode' | 'value' | 'onChange'>;

export type DatepickerProps = {
  dateFormat?: string;
  calendar: Omit<CalendarProps, 'value' | 'onChange'>;
} & Omit<BaseDatepickerProps, 'dateFormat' | 'mode' | 'value' | 'onChange'> & Pick<CalendarProps, 'value' | 'onChange'>;

export type RangeDatepickerProps = {
  dateFormat?: string;
  calendar: Omit<RangeCalendarProps, 'value' | 'onChange'>;
} & Omit<BaseDatepickerProps, 'dateFormat' | 'mode' | 'value' | 'onChange'> & Pick<RangeCalendarProps, 'value' | 'onChange'>;

export type DatepickerContextProps = {
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
} & BaseDatepickerProps & Required<Pick<BaseDatepickerProps, 'referenceDate'>>;