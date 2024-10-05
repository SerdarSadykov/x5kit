import {useContext} from 'react';
import {startOfMonth, startOfToday, startOfWeek} from 'date-fns';

import {CalendarContext} from 'calendar/Calendar';
import {BlockContext} from 'calendar/Block';

import {getDayProps} from './Day';

import type {DayProps} from './Day';

export const useDays = () => {
  const context = useContext(CalendarContext);
  const blockContext = useContext(BlockContext);

  const {weekStartsOn, blocks} = context;
  const {viewDate} = blockContext;

  const currentDateTime = startOfToday().getTime();

  const blockStart = startOfWeek(startOfMonth(viewDate), {weekStartsOn});

  const weeks: DayProps[][] = [];
  const curDay: Date = blockStart;

  for (let weekN = 0; weekN < 6; weekN++) {
    weeks[weekN] = [];

    for (let weekD = 1; weekD <= 7; weekD++) {
      weeks[weekN].push(
        getDayProps({
          context,
          blockContext,
          currentDateTime,
          date: new Date(curDay.getTime()),
        })
      );

      curDay.setDate(curDay.getDate() + 1);
    }

    if (blocks > 1 && curDay.getMonth() !== viewDate.getMonth()) {
      break;
    }
  }

  return {weeks, context};
};
