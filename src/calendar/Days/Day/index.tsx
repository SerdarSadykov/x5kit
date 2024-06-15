import styled from '@emotion/styled';

import {theme} from 'tokens';

import {DayEvents, DayProps} from './types';

export * from './utils';
export * from './types';

const Container = styled.div<Omit<DayProps, 'date'>>`
  position: relative;
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  user-select: none;

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 36px;
    height: 36px;
    box-sizing: border-box;
    border-style: solid;
    border-radius: ${theme.spaces.x2}px;
    border-width: 1px;
    border-color: ${({isToday}) => (isToday ? theme.colors.accent[90] : 'transparent')};
  }

  ${({isViewMonth, isRangeStart, isRangeEnd, isRangeIn, isRangeHover, isDisabled}) => {
    if (isDisabled) {
      return {
        color: theme.colors.grey[40],
      };
    }

    if (isRangeStart) {
      return {
        borderRadius: '4px 0 0 4px',
        color: theme.colors.white,
        backgroundColor: theme.colors.accent[90],
      };
    }

    if (isRangeEnd) {
      return {
        borderRadius: '0 4px 4px 0',
        color: theme.colors.white,
        backgroundColor: theme.colors.accent[90],
      };
    }

    if (isRangeIn || isRangeHover) {
      return {
        color: theme.colors.grey[100],
        backgroundColor: theme.colors.accent[10],
      };
    }

    if (!isViewMonth) {
      return {
        color: theme.colors.grey[60],
      };
    }

    return theme.colors.white;
  }}
`;

export const getDayComponent = ({date, ...props}: DayProps, events: DayEvents) => (
  <Container key={date.getTime()} {...props} {...events}>
    {date.getDate()}
  </Container>
);
