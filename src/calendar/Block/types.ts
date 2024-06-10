import {CalendarDropdownProps} from '../Dropdown/types';
import {CalendarProps} from '../types';
import {QA} from 'common';

export type CalendarBlockProps = {
  className?: string;
  elements: string[][];
  hideArrow?: 'left' | 'right';
  hoverDate: string;
  onChangeHoverDate: (value: string) => void;

  onChangeViewDate: CalendarDropdownProps['onChange'];
  onChangeDate: CalendarProps['onChange'];
} & QA &
  Pick<CalendarProps, 'date' | 'disabledDates' | 'long' | 'freezeRange' | 'viewDate' | 'minDate' | 'maxDate'>;
