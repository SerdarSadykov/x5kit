import {ReactNode} from 'react';
import {Day, FormatOptions} from 'date-fns';

import {QA} from 'common';

import {DropdownItem} from './Dropdown';

export enum CalendarMode {
  single = 'single',
  range = 'range',
}

export enum CalendarFreezeRange {
  start = 'start',
  end = 'end',
}

export type CalendarDay = Day;

export type CalendarDisableDates = (date: Date) => boolean;
export type CalendarTooltip = (date: Date) => ReactNode | string;

export type CalendarValue = Date | undefined;
export type BaseCalendarValue = [CalendarValue, CalendarValue];
export type RangeCalendarValue = BaseCalendarValue;

export type BaseCalendarProps = {
  mode: CalendarMode;

  value: BaseCalendarValue;
  onChange: (newValue: BaseCalendarValue) => void;

  viewDate?: Date;
  onChangeViewDate?: (newViewDate: Date) => void;

  minDate?: Date;
  maxDate?: Date;
  disabledDates?: CalendarDisableDates;

  weekStartsOn?: CalendarDay;
  blocks?: number;
  freezeRange?: CalendarFreezeRange;

  tooltips?: CalendarTooltip;
} & QA &
  Pick<FormatOptions, 'locale'>;

export type RangeCalendarProps = Omit<BaseCalendarProps, 'mode' | 'value'> & {
  value: RangeCalendarValue | undefined;
};

export type CalendarProps = {
  value: CalendarValue | undefined;
  onChange: (newValue: CalendarValue) => void;
} & Omit<BaseCalendarProps, 'mode' | 'value' | 'onChange' | 'freezeRange'>;

export type CalendarContextProps = {
  years: DropdownItem[];
  months: DropdownItem[];
  weekDays: Day[];
  hoverDate: Date | undefined;
  setHoverDate: (newHoverDate: Date | undefined) => void;
} & BaseCalendarProps &
  Required<Pick<BaseCalendarProps, 'value' | 'viewDate' | 'onChangeViewDate' | 'locale' | 'weekStartsOn' | 'blocks'>>;
