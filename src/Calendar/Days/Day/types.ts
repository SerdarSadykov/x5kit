import type {ReactNode} from 'react';

export type RangeDayProps = {
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isRangeIn: boolean;
  isRangeHover: boolean;
};

export type DayProps = {
  date: Date;
  tooltipContent: ReactNode | undefined;
  isHidden: boolean;
  isViewMonth: boolean;
  isToday: boolean;
  isDisabled: boolean;
} & RangeDayProps;
