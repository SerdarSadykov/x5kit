import {CalendarFreezeRange, CalendarMode} from 'Calendar/types';

import type {CalendarContextProps, BaseCalendarValue} from 'Calendar/types';

export const getNewRange = (date: Date, context: CalendarContextProps): BaseCalendarValue => {
  const {
    mode,
    freezeRange,
    value: [rangeStart, rangeEnd],
  } = context;

  if (mode === CalendarMode.single) {
    return [date, undefined];
  }

  if (freezeRange === CalendarFreezeRange.start && rangeStart) {
    return [rangeStart, date < rangeStart ? undefined : date];
  }

  if (freezeRange === CalendarFreezeRange.end && rangeEnd) {
    return [date > rangeEnd ? undefined : date, rangeEnd];
  }

  if (!rangeStart) {
    return [date, rangeEnd];
  }

  if (!rangeEnd) {
    return date > rangeStart ? [rangeStart, date] : [date, rangeStart];
  }

  return [date, undefined];
};

export const getNewHoverDate = (date: Date, context: CalendarContextProps): Date | undefined => {
  const {
    value: [rangeStart, rangeEnd],
    freezeRange,
  } = context;

  if (freezeRange === CalendarFreezeRange.start && rangeStart && date < rangeStart) {
    return;
  }

  if (freezeRange === CalendarFreezeRange.end && rangeEnd && date > rangeEnd) {
    return;
  }

  return date;
};
