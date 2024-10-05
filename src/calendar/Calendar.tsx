import {createContext, useContext} from 'react';
import styled from '@emotion/styled';

import {getQAAttribute, startOfDay} from 'common';
import {theme} from 'theme';

import {Block} from './Block';

import {CalendarMode} from './types';
import {useCalendar} from './hook';

import type {
  CalendarContextProps,
  BaseCalendarProps,
  CalendarProps,
  RangeCalendarProps,
  RangeCalendarValue,
} from './types';
import type {RequiredQA} from 'common';
import type {ReactNode} from 'react';

export const CalendarContext = createContext<CalendarContextProps>({} as never);

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.medium};
  border-radius: ${theme.spaces.x4}px;
  box-sizing: border-box;
  width: fit-content;

  ${theme.typography.p2}
`;

const CalendarComponent: React.FC<RequiredQA> = ({qa}) => {
  const {blocks} = useContext(CalendarContext);
  const getQA = getQAAttribute(qa);

  const blockComponents: ReactNode[] = [];

  for (let block = 0; block < blocks; block++) {
    blockComponents.push(<Block key={block} qa={getQA(`block-${block}`)} blockNumber={block} />);
  }

  return <Container data-qa={getQA()}>{blockComponents}</Container>;
};

export const BaseCalendar: React.FC<BaseCalendarProps> = ({qa, ...props}) => {
  const context = useCalendar(props);

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

export const Calendar: React.FC<CalendarProps> = ({value, onChange, ...props}) => {
  const override = {
    mode: CalendarMode.single,

    value: [value ? startOfDay(value) : undefined, undefined],

    onChange: newValue => onChange(newValue[0]),
  } as BaseCalendarProps;

  return <BaseCalendar {...props} {...override} />;
};
