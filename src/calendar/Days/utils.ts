import {Day, endOfMonth, endOfWeek, startOfMonth, startOfWeek} from 'date-fns';

export const getWeeks = (date: Date, weekStartsOn: Day): Date[][] => {
  const blockStart = startOfWeek(startOfMonth(date), {weekStartsOn});

  const weeks: Date[][] = [];
  const curDay: Date = blockStart;

  for (let weekN = 0; weekN < 6; weekN++) {
    weeks[weekN] = [];

    for (let weekD = 1; weekD <= 7; weekD++) {
      weeks[weekN].push(new Date(curDay.getTime()));

      curDay.setDate(curDay.getDate() + 1);
    }
  }

  return weeks;

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
};
