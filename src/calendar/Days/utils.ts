import {startOfMonth, startOfToday, startOfWeek} from 'date-fns';

import {CalendarContextProps, CalendarValue} from 'calendar/types';

import {DayProps} from './Day';

export const getNewRange = (value: CalendarValue, date: Date): CalendarValue => {
  let [rangeStart, rangeEnd] = value;

  if (!rangeStart) {
    return [date, rangeEnd];
  }

  if (!rangeEnd) {
    return [rangeStart, date];
  }

  if (date > rangeStart) {
    return [rangeStart, date];
  }

  return [date, rangeEnd];
};

export const getDayProps = (date: Date, context: CalendarContextProps): DayProps => {
  const {viewDate, minDate, maxDate, value, onChange} = context;
  const [rangeStart, rangeEnd] = value;

  const isViewMonth = viewDate.getMonth() === date.getMonth() && viewDate.getFullYear() === date.getFullYear();

  const isToday = startOfToday().getTime() === date.getTime();

  const isRangeStart = !!rangeStart && rangeStart.getTime() === date.getTime();

  const isRangeEnd = !!rangeEnd && rangeEnd.getTime() === date.getTime();

  const isRangeIn =
    !!rangeStart && !!rangeEnd && rangeStart.getTime() < date.getTime() && rangeEnd.getTime() > date.getTime();

  const isDisabled = (!!minDate && minDate > date) || (!!maxDate && maxDate < date);

  const onClick = () => {
    onChange(getNewRange(value, date));
  };

  return {
    date,
    isViewMonth,
    isToday,
    isRangeStart,
    isRangeEnd,
    isRangeIn,
    isDisabled,
    onClick,
  };
};

export const getWeeks = (context: CalendarContextProps): DayProps[][] => {
  const {viewDate, weekStartsOn} = context;
  const blockStart = startOfWeek(startOfMonth(viewDate), {weekStartsOn});

  const weeks: DayProps[][] = [];
  const curDay: Date = blockStart;

  for (let weekN = 0; weekN < 6; weekN++) {
    weeks[weekN] = [];

    for (let weekD = 1; weekD <= 7; weekD++) {
      weeks[weekN].push(getDayProps(new Date(curDay.getTime()), context));

      curDay.setDate(curDay.getDate() + 1);
    }
  }

  return weeks;
};

// const previousMonthDays = [];
// const monthDays = [];
// const nextMonthDays = [];

// const daysInMonth = date.daysInMonth();
// const startDate = date.startOf('month');
// let startWeekDay = date.startOf('month').day();
// let endWeekDay = date.endOf('month').day();

// startWeekDay = startWeekDay === 0 ? weekDays : startWeekDay - 1;
// endWeekDay = endWeekDay === 0 ? weekDays : endWeekDay - 1;

// // Generate previous month
// for (let i = startWeekDay; i > 0; i--) {
//   previousMonthDays.push(startDate.subtract(i, 'day').format(dateFormat));
// }

// // Generate next month
// const nextMonth = startDate.add(1, 'month');
// for (let i = endWeekDay, count = 0; i < weekDays; i++) {
//   nextMonthDays.push(nextMonth.add(count++, 'day').format(dateFormat));
// }

// // Generate current month
// for (let i = 0; i < daysInMonth; i++) {
//   monthDays.push(startDate.add(i, 'day').format(dateFormat));
// }

// const isHide = (unit: string) => (date: string) => {
//   if (hideOtherMonthDays) return null;
//   const normalizedDate = dayjs(date, dateFormat);
//   return unit === 'min' ? +normalizedDate > +minDate && date : +normalizedDate < +maxDate && date;
// };

// return [...previousMonthDays.map(isHide('min')), ...monthDays, ...nextMonthDays.map(isHide('max'))];
