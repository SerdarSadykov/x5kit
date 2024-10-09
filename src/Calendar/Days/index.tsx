import styled from '@emotion/styled';

import {getDayComponent} from './Day';
import {useDays} from './hook';

import type {RequiredQA} from 'common';
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

export const Days: React.FC<RequiredQA> = ({qa}) => {
  const {weeks, context} = useDays();

  const getWeek = (week: DayProps[], indx: number) => <Week key={indx}>{week.map(getDayComponent(context, qa))}</Week>;

  return <Container data-qa={qa}>{weeks.map(getWeek)}</Container>;
};
