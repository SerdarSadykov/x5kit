import {useState} from 'react';
import {Calendar, CalendarValue} from './index';

export const Button = () => {
  const [value, setValue] = useState<CalendarValue>();

  return (
    <div id="calendar">
      <Calendar
        value={value}
        onChange={setValue}
      />
    </div>
  );
};
