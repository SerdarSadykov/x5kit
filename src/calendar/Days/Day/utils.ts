import {CalendarMode} from 'calendar/types';

import type {CalendarContextProps} from 'calendar/types';
import type {BlockContextProps} from 'calendar/Block';

import type {DayProps, RangeDayProps} from './types';

type GetDayPropsArgs = {
  context: CalendarContextProps;
  blockContext: BlockContextProps;
  currentDateTime: number;
  date: Date;
};

const getRangeDayProps = ({date, context: {mode, value, hoverDate}}: GetDayPropsArgs): RangeDayProps => {
  const [rangeStart, rangeEnd] = value;

  if (mode === CalendarMode.single) {
    return {
      isSelected: !!rangeStart && rangeStart?.getTime() === date.getTime(),
      isRangeStart: false,
      isRangeEnd: false,
      isRangeIn: false,
      isRangeHover: false,
    };
  }

  const isRangeStart = !!rangeStart && rangeStart.getTime() === date.getTime();

  const isRangeEnd = !!rangeEnd && rangeEnd.getTime() === date.getTime();

  const isRangeIn =
    !!rangeStart && !!rangeEnd && rangeStart.getTime() < date.getTime() && rangeEnd.getTime() > date.getTime();

  const isRangeHover = (() => {
    if (!hoverDate || !rangeStart || !!rangeEnd) {
      return false;
    }

    if (hoverDate > rangeStart) {
      return date > rangeStart && date.getTime() <= hoverDate.getTime();
    }

    return date < rangeStart && date.getTime() >= hoverDate.getTime();
  })();

  return {
    isSelected: false,
    isRangeStart,
    isRangeEnd,
    isRangeIn,
    isRangeHover,
  };
};

export const getDayProps = (args: GetDayPropsArgs): DayProps => {
  const {
    date,
    currentDateTime,
    blockContext: {viewDate},
    context: {minDate, maxDate, tooltips, disabledDates, blocks},
  } = args;

  const isViewMonth = viewDate.getMonth() === date.getMonth() && viewDate.getFullYear() === date.getFullYear();

  const isHidden = !isViewMonth && blocks > 1;

  const isToday = currentDateTime === date.getTime();

  const isDisabled = (!!minDate && minDate > date) || (!!maxDate && maxDate < date) || !!disabledDates?.(date);

  const dayProps = {
    date,
    isHidden,
    isViewMonth,
    isToday,
    isDisabled,

    ...getRangeDayProps(args),
  } as DayProps;

  dayProps.tooltipContent = tooltips?.(dayProps);

  return dayProps;
};
