import {useContext} from 'react';
import styled from '@emotion/styled';

import {CalendarContext} from 'calendar/Calendar';

import {getDayComponent} from './Day';
import {getWeeks} from './utils';

export * from './utils';

const Container = styled.div`
  position: relative;
`;

const Week = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Days: React.FC = () => {
  const {viewDate, weekStartsOn} = useContext(CalendarContext);

  const weeks = getWeeks(viewDate, weekStartsOn);

  return (
    <Container>
      {weeks.map((week, indx) => (
        <Week key={indx}>{week.map(getDayComponent)}</Week>
      ))}
    </Container>
  );
};
