import React, {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {Day, Month, endOfMonth, setMonth, startOfDay, startOfMonth} from 'date-fns';
import {ru} from 'date-fns/locale';

import {RequiredQA, getQAAttribute} from 'common';
import {theme} from 'theme';

import Block from './Block';
import {DropdownItem} from './Dropdown';
import {
  CalendarContextProps,
  BaseCalendarProps,
  CalendarProps,
  RangeCalendarProps,
  CalendarMode,
  RangeCalendarValue,
} from './types';

export const CalendarContext = createContext<CalendarContextProps>({} as never);

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.medium};
  border-radius: ${theme.spaces.x4}px;
  box-sizing: 'border-box';
  font-family: ${theme.typography.base.fontFamily};
  font-size: ${theme.spaces.x8}px;
`;

const CalendarComponent: React.FC<RequiredQA> = ({qa}) => {
  const {blocks} = useContext(CalendarContext);
  const getQA = getQAAttribute(qa);

  const blockComponents: ReactNode[] = [];

  for (let block = 0; block < blocks; block++) {
    blockComponents.push(<Block qa={getQA(`block-${block}`)} blockNumber={block} />);
  }

  return <Container data-qa={getQA()}>{blockComponents}</Container>;
};

export const BaseCalendar: React.FC<BaseCalendarProps> = ({qa, ...props}) => {
  const locale = props.locale ?? ru;

  const value = props.value ?? [undefined, undefined];

  const minDate = props.minDate ? startOfDay(props.minDate) : undefined;
  const maxDate = props.maxDate ? startOfDay(props.maxDate) : undefined;

  const [viewDate, setViewDate] = useState<Date>(() => {
    let newViewDate = startOfDay(props.viewDate?.getTime() ?? new Date());

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

      disabled = !!minDate && minDate.getTime() >= endOfMonth(monthViewDate).getTime()

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

  return (
    <CalendarContext.Provider value={context}>
      <CalendarComponent qa={qa ?? 'calendar'} />
    </CalendarContext.Provider>
  );
};

export const RangeCalendar: React.FC<RangeCalendarProps> = props => {
  const [rangeStart, rangeEnd] = props.value ?? [];

  const value: RangeCalendarValue = [
    rangeStart ? startOfDay(rangeStart) : undefined,
    rangeEnd ? startOfDay(rangeEnd) : undefined,
  ];

  return <BaseCalendar mode={CalendarMode.range} {...props} value={value} />;
};

export const Calendar: React.FC<CalendarProps> = props => {
  const value: BaseCalendarProps['value'] = props.value ? [startOfDay(props.value), undefined] : [undefined, undefined];

  const onChange: BaseCalendarProps['onChange'] = newValue => props.onChange(newValue[0]);

  return <BaseCalendar mode={CalendarMode.single} {...props} value={value} onChange={onChange} />;
};
