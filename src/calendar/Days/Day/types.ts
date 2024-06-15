export type DayProps = {
  date: Date;
  isViewMonth: boolean;
  isToday: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isRangeIn: boolean;
  isRangeHover: boolean;
  isDisabled: boolean;
};

export type DayEvents = {
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};
