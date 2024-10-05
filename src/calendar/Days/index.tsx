import styled from '@emotion/styled';

import {getDayComponent} from './Day';
import {useDays} from './hook';

import type {DayProps} from './Day';

export * from './utils';
export * from './Day';

const Container = styled.div`
  position: relative;
`;

const Week = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Days: React.FC = () => {
  const {weeks, context} = useDays();

  const getWeek = (week: DayProps[], indx: number) => <Week key={indx}>{week.map(getDayComponent(context))}</Week>;

  return <Container>{weeks.map(getWeek)}</Container>;
};
