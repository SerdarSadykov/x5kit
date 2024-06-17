import React, {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {Day, Month, startOfDay} from 'date-fns';
import {ru} from 'date-fns/locale';

import {RequiredQA, getQAAttribute} from 'common';
import {theme} from 'theme';

import Block from './Block';
import {DropdownItem} from './Dropdown';
import {CalendarContextProps, BaseCalendarProps, CalendarProps, RangeCalendarProps, CalendarMode} from './types';

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

  const value = props.value ?? [null, null];

  const [viewDate, setViewDate] = useState<Date>(() => {
    let newViewDate = startOfDay(props.viewDate?.getTime() ?? new Date());

    if (props.minDate && newViewDate < props.minDate) {
      newViewDate = props.minDate;
    }

    if (props.maxDate && newViewDate > props.maxDate) {
      newViewDate = props.maxDate;
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
  const minYear = props.minDate ? props.minDate.getFullYear() : currentYear - 5;
  const maxYear = props.maxDate ? props.maxDate.getFullYear() : currentYear + 10;

  for (let i = minYear; i <= maxYear; i++) {
    years.push({
      name: String(i),
      value: i,
      disabled: false,
    });
  }

  for (let i = 0; i < 12; i++) {
    months.push({
      name: locale.localize.month(i as Month),
      value: i,
      disabled: false,
    });
  }

  const weekStartsOn = props.weekStartsOn ?? 1;
  const weekDays: Day[] = [0, 1, 2, 3, 4, 5, 6];

  weekDays.push(...weekDays.splice(0, weekStartsOn));

  const blocks = props.blocks ?? 1;

  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const context: CalendarContextProps = {
    ...props,
    value,
    viewDate,
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
  const value = props.value ?? [null, null];

  return <BaseCalendar mode={CalendarMode.range} {...props} value={value} />;
};

export const Calendar: React.FC<CalendarProps> = props => {
  const value: BaseCalendarProps['value'] = props.value ? [props.value, null] : [null, null];

  const onChange: BaseCalendarProps['onChange'] = newValue => props.onChange(newValue[0]);

  return <BaseCalendar mode={CalendarMode.single} {...props} value={value} onChange={onChange} />;
};
