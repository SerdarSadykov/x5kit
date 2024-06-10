import {FC, useContext} from 'react';
import styled from '@emotion/styled';
import {Day} from 'date-fns';

import {RequiredQA} from 'common';
import {CalendarContext} from 'calendar';

const Container = styled.div``;
const Item = styled.div``;

const weekDays: Day[] = [0, 1, 2, 3, 4, 5, 6];

export const Week: React.FC<RequiredQA> = ({qa}) => {
  const {locale} = useContext(CalendarContext);

  return (
    <Container>
      {weekDays.map(weekDay => (
        <Item key={weekDay}>{locale.localize.day(weekDay)}</Item>
      ))}
    </Container>
  );
};
