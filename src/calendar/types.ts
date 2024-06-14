import {Day, FormatOptions} from 'date-fns';

import {QA} from 'common';

import {DropdownItem} from './Dropdown';

export type CalendarDisabledDateInput = string | number | {value: string | number; tooltip?: string};
export type CalendarDisabledDateOutput = {value: number; tooltip?: string};

export enum freezeRangeValues {
  start = 'start',
  end = 'end',
}

export type CalendarDay = Day;

export type CalendarDisableDates = (date: Date) => boolean;

export type CalendarValue = [Date | null, Date | null];

export type CalendarBaseProps = {
  value?: CalendarValue;
  onChange: (newValue: CalendarValue) => void;

  viewDate?: Date;
  onChangeViewDate?: (newViewDate: Date) => void;

  minDate?: Date;
  maxDate?: Date;

  weekStartsOn?: CalendarDay;

  freezeRange?: keyof typeof freezeRangeValues;
  long?: boolean;
  disabledDates?: CalendarDisableDates;
} & Pick<FormatOptions, 'locale'>;

export type CalendarProps = CalendarBaseProps & QA;

export type CalendarContextProps = {
  years: DropdownItem[];
  months: DropdownItem[];
  weekDays: Day[];
} & CalendarProps &
  Required<Pick<CalendarProps, 'value' | 'viewDate' | 'onChangeViewDate' | 'locale' | 'weekStartsOn'>>;
