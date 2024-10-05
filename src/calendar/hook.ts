import {useEffect, useState} from 'react';

import {endOfMonth, setMonth, startOfMonth} from 'date-fns';
import {ru} from 'date-fns/locale';

import {startOfDay} from 'common';

import type {Day, Month} from 'date-fns';

import type {DropdownItem} from './Dropdown/types';
import type {CalendarContextProps, BaseCalendarProps} from './types';

export const useCalendar = (props: BaseCalendarProps) => {
  const locale = props.locale ?? ru;

  const value = props.value ?? [undefined, undefined];

  const minDate = props.minDate ? startOfDay(props.minDate) : undefined;
  const maxDate = props.maxDate ? startOfDay(props.maxDate) : undefined;

  const [viewDate, setViewDate] = useState<Date>(() => {
    let newViewDate = startOfDay(props.viewDate ?? new Date());

    if (minDate && newViewDate < minDate) {
      newViewDate = minDate;
    }

    if (maxDate && newViewDate > maxDate) {
      newViewDate = maxDate;
    }

    return newViewDate;
  });

  const onChangeViewDate: BaseCalendarProps['onChangeViewDate'] = newViewDate => {
    setViewDate(newViewDate);
    props.onChangeViewDate?.(newViewDate);
  };

  useEffect(() => {
    if (!props.viewDate) {
      return;
    }

    setViewDate(startOfDay(props.viewDate));
  }, [props.viewDate]);

  const years: DropdownItem[] = [];
  const months: DropdownItem[] = [];
  const currentYear = viewDate.getFullYear();
  const minYear = minDate ? minDate.getFullYear() : currentYear - 5;
  const maxYear = maxDate ? maxDate.getFullYear() : currentYear + 10;

  for (let i = minYear; i <= maxYear; i++) {
    years.push({
      name: String(i),
      value: i,
      disabled: false,
    });
  }

  for (let i = 0; i < 12; i++) {
    let disabled = false;

    if (minDate || maxDate) {
      const monthViewDate = setMonth(viewDate, i);

      disabled = !!minDate && minDate.getTime() >= endOfMonth(monthViewDate).getTime();

      disabled ||= !!maxDate && maxDate.getTime() <= startOfMonth(monthViewDate).getTime();
    }

    months.push({
      disabled,
      name: locale.localize.month(i as Month),
      value: i,
    });
  }

  const weekStartsOn = props.weekStartsOn ?? 1;
  const weekDays: Day[] = [0, 1, 2, 3, 4, 5, 6];

  weekDays.push(...weekDays.splice(0, weekStartsOn));

  const blocks = props.blocks ?? 1;

  const [hoverDate, setHoverDate] = useState<Date | undefined>();

  const context: CalendarContextProps = {
    ...props,
    value,
    viewDate,
    minDate,
    maxDate,
    years,
    weekDays,
    months,
    weekStartsOn,
    locale,
    blocks,
    hoverDate,
    setHoverDate,
    onChangeViewDate,
  };

  return context;
};
