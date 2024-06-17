import {ReactNode} from 'react';
import {Day, FormatOptions} from 'date-fns';

import {QA} from 'common';

import {DropdownItem} from './Dropdown';

export type CalendarDisabledDateInput = string | number | {value: string | number; tooltip?: string};
export type CalendarDisabledDateOutput = {value: number; tooltip?: string};

export enum CalendarFreezeRange {
  start = 'start',
  end = 'end',
}

export type CalendarDay = Day;

export type CalendarDisableDates = (date: Date) => boolean;
export type CalendarTooltip = (date: Date) => ReactNode | string;

export type CalendarValue = [Date | null, Date | null];

export type CalendarBaseProps = {
  value?: CalendarValue;
  onChange: (newValue: CalendarValue) => void;

  viewDate?: Date;
  onChangeViewDate?: (newViewDate: Date) => void;

  minDate?: Date;
  maxDate?: Date;
  disabledDates?: CalendarDisableDates;

  weekStartsOn?: CalendarDay;
  blocks?: number;
  freezeRange?: CalendarFreezeRange;

  tooltips?: CalendarTooltip;
} & Pick<FormatOptions, 'locale'>;

export type CalendarProps = CalendarBaseProps & QA;

export type CalendarContextProps = {
  years: DropdownItem[];
  months: DropdownItem[];
  weekDays: Day[];
  hoverDate: Date | null;
  setHoverDate: (newHoverDate: Date | null) => void;
} & CalendarProps &
  Required<Pick<CalendarProps, 'value' | 'viewDate' | 'onChangeViewDate' | 'locale' | 'weekStartsOn' | 'blocks'>>;
