import {useContext, useState} from 'react';
import styled from '@emotion/styled';

import {CalendarContext} from 'calendar/Calendar';

import {DayEvents, getDayComponent} from './Day';
import {getNewRange, getWeeks} from './utils';

export * from './utils';

const Container = styled.div`
  position: relative;
`;

const Week = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Days: React.FC = () => {
  const context = useContext(CalendarContext);
  const {onChange, value} = context;
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const weeks = getWeeks(context, hoverDate);

  const events = (date: Date): DayEvents => ({
    onClick: () => {
      onChange(getNewRange(value, date));
    },

    onMouseEnter: () => {
      setHoverDate(date);
    },

    onMouseLeave: () => {
      if (date.getTime() === hoverDate?.getTime()) {
        setHoverDate(null);
      }
    },
  });

  return (
    <Container>
      {weeks.map((week, indx) => (
        <Week key={indx}>{week.map(dayProps => getDayComponent(dayProps, events(dayProps.date)))}</Week>
      ))}
    </Container>
  );
};
