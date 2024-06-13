import {ButtonHTMLAttributes, MouseEventHandler, useContext} from 'react';
import styled from '@emotion/styled';
import {startOfMonth, endOfMonth, addMonths, subMonths} from 'date-fns';

import {getQAAttribute, RequiredQA} from 'common';
import {CalendarContext} from 'calendar';
import {ChevronLeft, ChevronRight} from 'icons';
import {SizeTokenValue} from 'tokens';

import {Years} from './Years';
import {Months} from './Months';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Center = styled.div`
  display: flex;
  gap: 8px;
`;

const ArrowButton = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  line-height: 0;
  background: no-repeat;
  border: none;
  outline: none;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
`;

const ArrowLeft: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  return (
    <ArrowButton {...props}>
      <ChevronLeft size={SizeTokenValue.Small} />
    </ArrowButton>
  );
};

const ArrowRight: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  return (
    <ArrowButton {...props}>
      <ChevronRight size={SizeTokenValue.Small} />
    </ArrowButton>
  );
};

export const Header: React.FC<RequiredQA> = ({qa}) => {
  const {viewDate, minDate, maxDate, onChangeViewDate} = useContext(CalendarContext);

  const getQA = getQAAttribute(qa);

  const isPrevDisabled = !!minDate && minDate >= endOfMonth(viewDate);
  const isNextDisabled = !!maxDate && maxDate <= startOfMonth(viewDate);

  const onPrev: MouseEventHandler = () => {
    onChangeViewDate(addMonths(viewDate, 1));
  };

  const onNext: MouseEventHandler = () => {
    onChangeViewDate(subMonths(viewDate, 1));
  };

  return (
    <Container data-qa={getQA()}>
      <ArrowLeft data-qa={getQA('previous')} disabled={isPrevDisabled} onClick={onPrev} />
      <Center>
        <Years qa={getQA('year')} />
        <Months qa={getQA('month')} />
      </Center>
      <ArrowRight data-qa={getQA('next')} disabled={isNextDisabled} onClick={onNext} />
    </Container>
  );
};
