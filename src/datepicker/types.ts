import {CalendarProps} from 'calendar';
import {InputProps} from 'input';

export type DatepickerProps = {
  calendar: Omit<CalendarProps, 'value' | 'onChange'>;
} & Omit<InputProps, 'value' | 'onChange' | 'onClearClick'> & Pick<CalendarProps, 'value' | 'onChange'>;
