import styled from '@emotion/styled';

import {DayProps, getDayComponent} from './Day';
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

  const getWeek = (week: DayProps[], indx: number) => (
    <Week key={indx}>{week.map(dayProps => getDayComponent(dayProps, events(dayProps.date)))}</Week>
  );

  return <Container>{weeks.map(getWeek)}</Container>;
};
