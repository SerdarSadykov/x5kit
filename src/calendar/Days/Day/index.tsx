import styled from '@emotion/styled';
import {theme} from 'tokens';

const Container = styled.div<Omit<DayProps, 'date'>>`
  position: relative;
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;

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

  ${({isViewMonth, isRangeStart, isRangeEnd, isRangeIn, isDisabled}) => {
    if (isDisabled) {
      return {
        color: theme.colors.grey[40],
      }
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

    if (isRangeIn) {
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

export type DayProps = {
  date: Date;
  isViewMonth: boolean;
  isToday: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isRangeIn: boolean;
  isDisabled: boolean;
  onClick: () => void;
};

export const getDayComponent = ({date, ...props}: DayProps) => (
  <Container key={date.getTime()} {...props}>
    {date.getDate()}
  </Container>
);
