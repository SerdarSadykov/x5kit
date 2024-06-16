import {ButtonHTMLAttributes, MouseEventHandler, useContext, useState} from 'react';
import styled from '@emotion/styled';
import {startOfMonth, endOfMonth, addMonths, subMonths} from 'date-fns';

import {getQAAttribute, RequiredQA} from 'common';
import {ChevronLeft, ChevronRight} from 'icons';
import {SizeTokenValue, SpaceTokenName, theme} from 'theme';
import {CalendarContext} from 'calendar';

import {Years} from './Years';
import {Months} from './Months';
import {HeaderDropdownProps} from './types';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spaces.x4}px;
  padding: ${theme.spaces.join(SpaceTokenName.x2, SpaceTokenName.x0)};
`;

const Center = styled.div`
  display: flex;
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

enum IsOpenDropdown {
  year = 'year',
  month = 'month',
}

export const Header: React.FC<RequiredQA> = ({qa}) => {
  const {viewDate, minDate, maxDate, onChangeViewDate} = useContext(CalendarContext);

  const [isOpen, setIsOpen] = useState<IsOpenDropdown | null>(null);

  const getQA = getQAAttribute(qa);

  const isPrevDisabled = !!minDate && minDate >= endOfMonth(viewDate);
  const isNextDisabled = !!maxDate && maxDate <= startOfMonth(viewDate);

  const onPrev: MouseEventHandler = () => {
    onChangeViewDate(subMonths(viewDate, 1));
  };

  const onNext: MouseEventHandler = () => {
    onChangeViewDate(addMonths(viewDate, 1));
  };

  const getDropdownProps = (dropdown: IsOpenDropdown): HeaderDropdownProps => ({
    qa: getQA(dropdown),
    isOpen: isOpen === dropdown,
    setIsOpen: newIsOpen => {
      setIsOpen(newIsOpen && isOpen !== dropdown ? dropdown : null);
    },
  });

  return (
    <Container data-qa={getQA()}>
      <ArrowLeft data-qa={getQA('previous')} disabled={isPrevDisabled} onClick={onPrev} />
      <Center>
        <Months {...getDropdownProps(IsOpenDropdown.month)} />
        <Years {...getDropdownProps(IsOpenDropdown.year)} />
      </Center>
      <ArrowRight data-qa={getQA('next')} disabled={isNextDisabled} onClick={onNext} />
    </Container>
  );
};
