import {useContext, useState} from 'react';
import styled from '@emotion/styled';

import {CalendarContext} from 'calendar/Calendar';
import {BlockContext} from 'calendar/Block';

import {DayEvents, getDayComponent} from './Day';
import {getNewRange} from './utils';

import {useEvents, useWeeks} from './hook';

export * from './utils';

const Container = styled.div`
  position: relative;
`;

const Week = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Days: React.FC = () => {
  const weeks = useWeeks();
  const events = useEvents();

  return (
    <Container>
      {weeks.map((week, indx) => (
        <Week key={indx}>{week.map(dayProps => getDayComponent(dayProps, events(dayProps.date)))}</Week>
      ))}
    </Container>
  );
};
