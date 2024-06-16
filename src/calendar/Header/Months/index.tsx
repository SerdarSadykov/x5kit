import {useContext} from 'react';
import {Month, setMonth} from 'date-fns';

import {CalendarContext} from 'calendar';
import {Dropdown, DropdownItem, DropdownProps} from 'calendar/Dropdown';

import {HeaderDropdownProps} from '../types';

export const useMonths = (props: HeaderDropdownProps): DropdownProps => {
  const {locale, viewDate, months, onChangeViewDate} = useContext(CalendarContext);

  const value: DropdownItem = {
    name: locale.localize.month(viewDate.getMonth() as Month),
    value: viewDate.getMonth(),
    disabled: false,
  };

  const onChange = (newItem: DropdownItem) => {
    onChangeViewDate(setMonth(viewDate, newItem.value));
  };

  return {...props, onChange, value, items: months, width: 112};
};

export const Months: React.FC<HeaderDropdownProps> = props => {
  const dropdownProps = useMonths(props);

  return <Dropdown {...dropdownProps} />;
};
