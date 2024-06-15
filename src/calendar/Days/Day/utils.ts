import {startOfToday} from 'date-fns';

import {CalendarContextProps} from 'calendar/types';

import {DayProps} from './types';

export const getDayProps = (context: CalendarContextProps, date: Date, hoverDate: Date | null): DayProps => {
  const {viewDate, minDate, maxDate, value, onChange} = context;
  const [rangeStart, rangeEnd] = value;

  const isViewMonth = viewDate.getMonth() === date.getMonth() && viewDate.getFullYear() === date.getFullYear();

  const isToday = startOfToday().getTime() === date.getTime();

  const isRangeStart = !!rangeStart && rangeStart.getTime() === date.getTime();

  const isRangeEnd = !!rangeEnd && rangeEnd.getTime() === date.getTime();

  const isRangeIn =
    !!rangeStart && !!rangeEnd && rangeStart.getTime() < date.getTime() && rangeEnd.getTime() > date.getTime();

  const isRangeHover = (() => {
    if(!hoverDate || !rangeStart || !!rangeEnd){
      return false;
    }

    if(hoverDate > rangeStart){
      return date > rangeStart && date.getTime() <= hoverDate.getTime();
    }

    return date < rangeStart && date.getTime() >= hoverDate.getTime();
  })()

  const isDisabled = (!!minDate && minDate > date) || (!!maxDate && maxDate < date);

  return {
    date,
    isViewMonth,
    isToday,
    isRangeStart,
    isRangeEnd,
    isRangeIn,
    isRangeHover,
    isDisabled,
  };
};
