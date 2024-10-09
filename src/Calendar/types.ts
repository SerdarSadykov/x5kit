import type {Day, FormatOptions} from 'date-fns';

import type {QA} from 'common';

import type {DayProps} from './Days/Day';
import type {DropdownItem} from './Dropdown/types';

export enum CalendarMode {
  /** Дата */
  single = 'single',
  /** Период */
  range = 'range',
}

export enum CalendarFreezeRange {
  /** Без выбора начала периода */
  start = 'start',
  /** Без выбора окончания периода */
  end = 'end',
}

export type CalendarDay = Day;

export type CalendarDisableDates = (date: Date) => boolean;
export type CalendarTooltip = React.FC<DayProps>;

export type CalendarValue = Date | undefined;
export type BaseCalendarValue = [CalendarValue, CalendarValue];
export type RangeCalendarValue = BaseCalendarValue;

export type BaseCalendarProps = {
  /** Режим календаря дата|период */
  mode: CalendarMode;

  /** Выбранная дата|период */
  value: BaseCalendarValue;
  /** Обработчик смены даты|периода */
  onChange: (newValue: BaseCalendarValue) => void;

  /** Фокус-дата */
  viewDate?: Date;
  /** Обработчик смены фокус-даты */
  onChangeViewDate?: (newViewDate: Date) => void;

  /** Левая граница */
  minDate?: Date;
  /** Правая граница */
  maxDate?: Date;
  /**
   * Обработчик недоступных дат
   *
   * Не влияет на отключение выбора месяца и года, т.к. пересчет происходит по 2 ближайшим месяцам
   */
  disabledDates?: CalendarDisableDates;

  /** Неделя начинается с указанного дня */
  weekStartsOn?: CalendarDay;
  /**
   * Кол-во выводимых календарей
   *
   * Обычно применяется при выборе периода
   */
  blocks?: number;
  /** Запретить смену начала|конца периода */
  freezeRange?: CalendarFreezeRange;

  /** Обрабочик тултипов для дат */
  tooltips?: CalendarTooltip;
} & QA &
  Pick<FormatOptions, 'locale'>;

export type RangeCalendarProps = Omit<BaseCalendarProps, 'mode' | 'value'> & {
  /** Выбранный период */
  value: RangeCalendarValue | undefined;
};

export type CalendarProps = {
  /** Выбранная дата */
  value: CalendarValue | undefined;
  /** Обработчик смены даты */
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
