import {useContext} from 'react';
import styled from '@emotion/styled';
import {startOfMonth, endOfMonth, addMonths, subMonths} from 'date-fns';

import {getQAAttribute} from 'common';
import {Tooltip} from 'Tooltip';
import {ChevronLeft, ChevronRight} from 'icons';
import {Placement, SizeTokenValue, SpaceTokenName, theme} from 'theme';
import {CalendarContext} from 'Calendar';
import {BlockContext} from 'Calendar/Block';

import {HeaderDate} from './HeaderDate';
import {HeaderDateDropdown} from './HeaderDateDropdown';

import type {RequiredQA} from 'common';
import type {ButtonHTMLAttributes, MouseEventHandler} from 'react';

export * from './HeaderDateDropdown';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spaces.x4}px;
  padding: ${theme.spaces.join(SpaceTokenName.x2, SpaceTokenName.x0)};
`;

const ArrowButton = styled.button`
  width: 32px;
  height: 32px;
  padding: 0;
  line-height: 0;
  background: no-repeat;
  border: none;
  outline: none;
  border-radius: 4px;
  color: ${props => theme.colors.grey[props.disabled ? 40 : 60]};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};

  :hover {
    background-color: ${props => (props.disabled ? undefined : theme.colors.grey[20])};
  }

  &[hidden] {
    display: block;
    visibility: hidden;
    pointer-events: none;
  }
`;

const ArrowLeft: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  return (
    <Tooltip placement={Placement.bottom} content="Предыдущий месяц">
      <ArrowButton {...props}>
        <ChevronLeft size={SizeTokenValue.Medium} />
      </ArrowButton>
    </Tooltip>
  );
};

const ArrowRight: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  return (
    <Tooltip placement={Placement.bottom} content="Следующий месяц">
      <ArrowButton {...props}>
        <ChevronRight size={SizeTokenValue.Medium} />
      </ArrowButton>
    </Tooltip>
  );
};

export const Header: React.FC<RequiredQA> = ({qa}) => {
  const context = useContext(CalendarContext);
  const {minDate, maxDate, onChangeViewDate} = context;
  const {isSingle, isFirst, isLast} = useContext(BlockContext);
  const {viewDate} = useContext(BlockContext);

  const getQA = getQAAttribute(qa);

  const isPrevDisabled = !!minDate && endOfMonth(minDate).getTime() >= endOfMonth(viewDate).getTime();
  const isNextDisabled = !!maxDate && startOfMonth(maxDate).getTime() <= startOfMonth(viewDate).getTime();

  const onPrev: MouseEventHandler = () => {
    onChangeViewDate(subMonths(context.viewDate, 1));
  };

  const onNext: MouseEventHandler = () => {
    onChangeViewDate(addMonths(context.viewDate, 1));
  };

  const HeaderDateComponent = isSingle ? HeaderDateDropdown : HeaderDate;

  return (
    <Container data-qa={getQA()}>
      <ArrowLeft data-qa={getQA('previous')} disabled={isPrevDisabled} onClick={onPrev} hidden={!isFirst} />
      <HeaderDateComponent qa={getQA()} />
      <ArrowRight data-qa={getQA('next')} disabled={isNextDisabled} onClick={onNext} hidden={!isLast} />
    </Container>
  );
};
