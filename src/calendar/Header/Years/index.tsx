import {useContext} from 'react';
import {setYear} from 'date-fns';

import {CalendarContext} from 'calendar';
import {Dropdown, DropdownItem, DropdownProps} from 'calendar/Dropdown';

import {HeaderDropdownProps} from '../types';

export const useYears = (props: HeaderDropdownProps): DropdownProps => {
  const {viewDate, years, onChangeViewDate} = useContext(CalendarContext);

  const value: DropdownItem = {
    name: String(viewDate.getFullYear()),
    value: viewDate.getFullYear(),
    disabled: false,
  };

  const onChange = (newItem: DropdownItem) => {
    onChangeViewDate(setYear(viewDate, newItem.value));
  };

  return {...props, onChange, value, items: years, width: 80};
};

export const Years: React.FC<HeaderDropdownProps> = props => {
  const dropdownProps = useYears(props);

  return <Dropdown {...dropdownProps} />;
};
