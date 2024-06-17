import {useState} from 'react';
import {Calendar, CalendarFreezeRange, CalendarValue} from './index';

const minDate = new Date();
minDate.setFullYear(2025);
minDate.setHours(0);
minDate.setMinutes(0);
minDate.setSeconds(0);
minDate.setMilliseconds(0);

export const Button = () => {
  const [value, setValue] = useState<CalendarValue>();


  // const maxDate = new Date();
  // maxDate.setHours(0);
  // maxDate.setMinutes(0);
  // maxDate.setSeconds(0);
  // maxDate.setMilliseconds(0);

  return (
    <div id="calendar">
      <Calendar
        value={value}
        onChange={setValue}
        blocks={2}
        viewDate={minDate}
        // freezeRange={CalendarFreezeRange.start}
        // minDate={minDate}
        // maxDate={maxDate}
      />
    </div>
  );
};
