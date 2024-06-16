import {useContext} from 'react';
import styled from '@emotion/styled';
import {Day} from 'date-fns';

import {RequiredQA} from 'common';
import {CalendarContext} from 'calendar';
import {theme} from 'theme';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
`;

type ItemStyle = {weekDay: Day};

const Item = styled.div<ItemStyle>`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;

  color: ${({weekDay}) => (weekDay === 0 || weekDay === 6 ? theme.colors.additional.red[80] : theme.colors.grey[60])};
`;

export const WeekDays: React.FC<RequiredQA> = ({qa}) => {
  const {locale, weekDays} = useContext(CalendarContext);

  const items = weekDays.map(weekDay => (
    <Item key={weekDay} weekDay={weekDay}>
      {locale.localize.day(weekDay, {width: 'short'})}
    </Item>
  ));

  return <Container>{items}</Container>;
};
