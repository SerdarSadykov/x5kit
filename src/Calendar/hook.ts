import {useMemo, useState} from 'react';

import {endOfMonth, isSameDay, setMonth, startOfMonth} from 'date-fns';
import {ru} from 'date-fns/locale';

import {startOfDay, useUpdateEffect} from 'common';

import type {Day, Month} from 'date-fns';

import type {DropdownItem} from './Dropdown/types';
import type {CalendarContextProps, BaseCalendarProps} from './types';

export const useCalendar = (props: BaseCalendarProps) => {
  const locale = props.locale ?? ru;

  const value = props.value ?? [undefined, undefined];

  const blocks = props.blocks ?? 1;

  const [hoverDate, setHoverDate] = useState<Date | undefined>();

  const [minDate, maxDate, getViewDate] = useMemo(() => {
    const minDate = props.minDate ? startOfDay(props.minDate) : undefined;
    const maxDate = props.maxDate ? startOfDay(props.maxDate) : undefined;

    const getViewDate = (newViewDate: Date): Date => {
      newViewDate = startOfDay(newViewDate);

      if (minDate && newViewDate < minDate) {
        return minDate;
      }

      if (maxDate && newViewDate > maxDate) {
        return maxDate;
      }

      return newViewDate;
    };

    return [minDate, maxDate, getViewDate];
  }, [props.minDate, props.maxDate]);

  const [viewDate, setViewDate] = useState<Date>(() => getViewDate(props.viewDate ?? new Date()));

  const onChangeViewDate: BaseCalendarProps['onChangeViewDate'] = newViewDate => {
    setViewDate(newViewDate);
    props.onChangeViewDate?.(newViewDate);
  };

  useUpdateEffect(() => {
    if (!props.viewDate || isSameDay(props.viewDate, viewDate)) {
      return;
    }

    setViewDate(getViewDate(props.viewDate));
  }, [props.viewDate, minDate, maxDate]);

  const weekStartsOn = props.weekStartsOn ?? 1;

  const [years, months, weekDays] = useMemo(() => {
    const currentYear = viewDate.getFullYear();
    const minYear = minDate ? minDate.getFullYear() : currentYear - 5;
    const maxYear = maxDate ? maxDate.getFullYear() : currentYear + 10;

    const years: DropdownItem[] = [];
    const months: DropdownItem[] = [];

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

    const weekDays: Day[] = [0, 1, 2, 3, 4, 5, 6];

    weekDays.push(...weekDays.splice(0, weekStartsOn));

    return [years, months, weekDays];
  }, [locale.localize, weekStartsOn, minDate, maxDate, viewDate]);

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
