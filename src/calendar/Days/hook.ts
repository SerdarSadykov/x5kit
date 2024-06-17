import {useContext} from 'react';
import {startOfMonth, startOfWeek} from 'date-fns';

import {CalendarContext} from 'calendar/Calendar';
import {BlockContext} from 'calendar/Block';

import {DayEvents, DayProps, getDayProps} from './Day';
import {getNewHoverDate, getNewRange} from './utils';

export const useWeeks = (): DayProps[][] => {
  const context = useContext(CalendarContext);
  const {viewDate} = useContext(BlockContext);

  const {weekStartsOn, hoverDate} = context;
  const blockStart = startOfWeek(startOfMonth(viewDate), {weekStartsOn});

  const weeks: DayProps[][] = [];
  const curDay: Date = blockStart;

  for (let weekN = 0; weekN < 6; weekN++) {
    weeks[weekN] = [];

    for (let weekD = 1; weekD <= 7; weekD++) {
      weeks[weekN].push(
        getDayProps({
          context,
          viewDate,
          hoverDate,
          date: new Date(curDay.getTime()),
        })
      );

      curDay.setDate(curDay.getDate() + 1);
    }
  }

  return weeks;
};

export const useEvents = () => {
  const context = useContext(CalendarContext);
  const {onChange, hoverDate, setHoverDate} = context;

  const events = (date: Date): DayEvents => ({
    onClick: () => {
      onChange(getNewRange(date, context));
    },

    onMouseEnter: () => {
      setHoverDate(getNewHoverDate(date, context));
    },

    onMouseLeave: () => {
      if (date.getTime() === hoverDate?.getTime()) {
        setHoverDate(null);
      }
    },
  });

  return events;
};
