import {ReactNode} from 'react';

export type RangeDayProps = {
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isRangeIn: boolean;
  isRangeHover: boolean;
}

export type DayProps = {
  date: Date;
  tooltip: ReactNode | string | null;
  isViewMonth: boolean;
  isToday: boolean;
  isDisabled: boolean;
} & RangeDayProps;

export type DayEvents = {
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};
