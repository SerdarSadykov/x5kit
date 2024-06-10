import {ButtonHTMLAttributes, MouseEventHandler, useContext} from 'react';
import styled from '@emotion/styled';
import {startOfMonth, endOfMonth} from 'date-fns';

import {CalendarContext} from 'calendar';
import {ChevronLeft, ChevronRight} from 'icons';
import {getQAAttribute, RequiredQA} from 'common';

import {Years} from './Years';
import {Months} from './Months';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 17.5px;
`;

const ArrowButton = styled.button``;

const ArrowLeft: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  return (
    <ArrowButton {...props}>
      <ChevronLeft />
    </ArrowButton>
  );
};

const ArrowRight: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  return (
    <ArrowButton {...props}>
      <ChevronRight />
    </ArrowButton>
  );
};


export const Header: React.FC<RequiredQA> = ({qa}) => {
  const {viewDate, minDate, maxDate} = useContext(CalendarContext);

  const getQA = getQAAttribute(qa);

  const isPrevDisabled = !!minDate && minDate >= endOfMonth(viewDate);
  const isNextDisabled = !!maxDate && maxDate <= startOfMonth(viewDate);

  const onPrev: MouseEventHandler = () => {};

  const onNext: MouseEventHandler = () => {};

  return (
    <HeaderContainer data-qa={getQA()}>
      <ArrowLeft data-qa={getQA('previous')} disabled={isPrevDisabled} onClick={onPrev} />
      <div>
        <Years qa={getQA('year')} />
        <Months qa={getQA('month')} />
      </div>
      <ArrowRight data-qa={getQA('next')} disabled={isNextDisabled} onClick={onNext} />
    </HeaderContainer>
  );
};
