import {startOfToday} from 'date-fns';

import {CalendarContextProps} from 'calendar/types';

import {DayProps} from './types';

type GetDayPropsArgs = {
  context: CalendarContextProps;
  date: Date;
  viewDate: Date;
  hoverDate: Date | null;
}

export const getDayProps = ({context, date, viewDate, hoverDate}: GetDayPropsArgs): DayProps => {
  const {minDate, maxDate, value, disabledDates, tooltips} = context;
  const [rangeStart, rangeEnd] = value;

  const isViewMonth = viewDate.getMonth() === date.getMonth() && viewDate.getFullYear() === date.getFullYear();

  const isToday = startOfToday().getTime() === date.getTime();

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

  const isDisabled = (!!minDate && minDate > date) || (!!maxDate && maxDate < date) || !!disabledDates?.(date);

  const tooltip = tooltips?.(date) || null;

  return {
    date,
    tooltip,
    isViewMonth,
    isToday,
    isRangeStart,
    isRangeEnd,
    isRangeIn,
    isRangeHover,
    isDisabled,
  };
};
