import {useContext} from 'react';
import styled from '@emotion/styled';
import {Month} from 'date-fns';

import {HeaderDateType} from '../types';

import {RequiredQA, getQAAttribute} from 'common';
import {theme} from 'theme';
import {CalendarContext} from 'calendar/Calendar';
import {BlockContext} from 'calendar/Block';

const Container = styled.div`
  display: flex;
  gap: ${theme.spaces.x4}px;
  text-transform: capitalize;
  user-select: none;
`;

export const HeaderDate: React.FC<RequiredQA> = ({qa}) => {
  const {locale} = useContext(CalendarContext);
  const {viewDate} = useContext(BlockContext);

  const getQA = getQAAttribute(qa);

  const month = locale.localize.month(viewDate.getMonth() as Month);
  const year = viewDate.getFullYear();

  return (
    <Container>
      <div data-qa={getQA(HeaderDateType.month)}>{month}</div>
      <div data-qa={getQA(HeaderDateType.year)}>{year}</div>
    </Container>
  );
};
