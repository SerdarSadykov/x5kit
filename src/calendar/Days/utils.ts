import {CalendarContextProps, CalendarFreezeRange, BaseCalendarValue, CalendarMode} from 'calendar/types';

export const getNewRange = (date: Date, context: CalendarContextProps): BaseCalendarValue => {
  const {
    mode,
    freezeRange,
    value: [rangeStart, rangeEnd],
  } = context;

  if (mode === CalendarMode.single) {
    return [date, null];
  }

  if (freezeRange === CalendarFreezeRange.start && rangeStart) {
    return [rangeStart, date < rangeStart ? null : date];
  }

  if (freezeRange === CalendarFreezeRange.end && rangeEnd) {
    return [date > rangeEnd ? null : date, rangeEnd];
  }

  if (!rangeStart) {
    return [date, rangeEnd];
  }

  if (!rangeEnd) {
    return date > rangeStart ? [rangeStart, date] : [date, rangeStart];
  }

  return [date, null];
};

export const getNewHoverDate = (date: Date, context: CalendarContextProps): Date | null => {
  const {
    value: [rangeStart, rangeEnd],
    freezeRange,
  } = context;

  if (freezeRange === CalendarFreezeRange.start && rangeStart && date < rangeStart) {
    return null;
  }

  if (freezeRange === CalendarFreezeRange.end && rangeEnd && date > rangeEnd) {
    return null;
  }

  return date;
};
