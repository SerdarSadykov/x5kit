import {useContext} from 'react';
import styled from '@emotion/styled';

import {RequiredQA} from 'common';
import {CalendarContext} from 'calendar';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
`;

const Item = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const WeekDays: React.FC<RequiredQA> = ({qa}) => {
  const {locale, weekDays} = useContext(CalendarContext);

  return (
    <Container>
      {weekDays.map(weekDay => (
        <Item key={weekDay}>{locale.localize.day(weekDay, {width: 'short'})}</Item>
      ))}
    </Container>
  );
};
