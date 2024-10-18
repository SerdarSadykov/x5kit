import type {UseFloatingReturn} from '@floating-ui/react';

import type {BaseCalendarProps, CalendarProps, RangeCalendarProps} from 'Calendar';
import type {InputProps} from 'Input';

export const DEFAULT_FORMAT = 'дд.мм.гггг';

export type BaseDatepickerProps = {
  /** Раскрыт ли календарь */
  isOpen?: boolean;
  /** Обработчик раскрытия календаря */
  setIsOpen?: (newIsOpen: boolean) => void;

  /** Формат даты в инпуте
   *
   * поддержка д|d|м|m|г|y
   */
  formatStr: string;

  /** Свойства календаря */
  calendarProps?: Omit<BaseCalendarProps, 'mode' | 'value' | 'onChange'>;

  /** Контрольная дата */
  referenceDate?: Date;
} & Omit<InputProps, 'mask' | 'value' | 'onChange' | 'onClearClick'> &
  Pick<BaseCalendarProps, 'mode' | 'value' | 'onChange'>;

export type DatepickerProps = {
  /** Формат даты в инпуте
   *
   * поддержка д|d|м|m|г|y
   */
  formatStr?: string;
  /** Свойства календаря */
  calendarProps?: Omit<CalendarProps, 'value' | 'onChange'>;
} & Omit<BaseDatepickerProps, 'formatStr' | 'mode' | 'value' | 'onChange'> &
  Pick<CalendarProps, 'value' | 'onChange'>;

export type RangeDatepickerProps = {
  /** Формат даты в инпуте
   *
   * поддержка д|d|м|m|г|y
   */
  formatStr?: string;
  /** Свойства календаря */
  calendarProps?: Omit<RangeCalendarProps, 'value' | 'onChange'>;
} & Omit<BaseDatepickerProps, 'formatStr' | 'mode' | 'value' | 'onChange'> &
  Pick<RangeCalendarProps, 'value' | 'onChange'>;

export type DatepickerContextProps = {
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
  floating: UseFloatingReturn;
} & BaseDatepickerProps &
  Required<Pick<BaseDatepickerProps, 'referenceDate'>>;
