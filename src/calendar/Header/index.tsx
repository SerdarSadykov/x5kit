import {ButtonHTMLAttributes, MouseEventHandler, useContext} from 'react';
import styled from '@emotion/styled';
import {startOfMonth, endOfMonth, addMonths, subMonths} from 'date-fns';

import {getQAAttribute, RequiredQA} from 'common';
import {ChevronLeft, ChevronRight} from 'icons';
import {SizeTokenValue, SpaceTokenName, theme} from 'theme';
import {CalendarContext} from 'calendar';
import {BlockContext} from 'calendar/Block';

import {HeaderDate} from './HeaderDate';
import {HeaderDateDropdown} from './HeaderDateDropdown';

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
  color: ${theme.colors.grey[60]};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};

  &[hidden] {
    display: block;
    visibility: hidden;
    pointer-events: none;
  }
`;

const ArrowLeft: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  return (
    <ArrowButton {...props}>
      <ChevronLeft size={SizeTokenValue.Medium} />
    </ArrowButton>
  );
};

const ArrowRight: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  return (
    <ArrowButton {...props}>
      <ChevronRight size={SizeTokenValue.Medium} />
    </ArrowButton>
  );
};

export const Header: React.FC<RequiredQA> = ({qa}) => {
  const {minDate, maxDate, onChangeViewDate} = useContext(CalendarContext);
  const {isSingle, isFirst, isLast} = useContext(BlockContext);
  const {viewDate} = useContext(BlockContext);

  const getQA = getQAAttribute(qa);

  const isPrevDisabled = !!minDate && endOfMonth(minDate).getTime() >= endOfMonth(viewDate).getTime();
  const isNextDisabled = !!maxDate && startOfMonth(maxDate).getTime() <= startOfMonth(viewDate).getTime();

  const onPrev: MouseEventHandler = () => {
    onChangeViewDate(subMonths(viewDate, 1));
  };

  const onNext: MouseEventHandler = () => {
    onChangeViewDate(addMonths(viewDate, 1));
  };

  const HeaderDateComponent = isSingle ? HeaderDateDropdown : HeaderDate

  return (
    <Container data-qa={getQA()}>
      <ArrowLeft data-qa={getQA('previous')} disabled={isPrevDisabled} onClick={onPrev} hidden={!isFirst} />
      <HeaderDateComponent qa={getQA()} />
      <ArrowRight data-qa={getQA('next')} disabled={isNextDisabled} onClick={onNext} hidden={!isLast} />
    </Container>
  );
};
