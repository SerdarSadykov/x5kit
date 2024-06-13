import {useContext} from 'react';
import {setYear} from 'date-fns';

import {RequiredQA} from 'common';
import {CalendarContext} from 'calendar';
import {Dropdown, DropdownItem, DropdownProps} from 'calendar/Dropdown';

export const useYears = (): DropdownProps => {
  const {viewDate, years, onChangeViewDate} = useContext(CalendarContext);

  const value: DropdownItem = {
    name: String(viewDate.getFullYear()),
    value: viewDate.getFullYear(),
    disabled: false,
  };

  const onChange = (newItem: DropdownItem) => {
    onChangeViewDate(setYear(viewDate, newItem.value));
  };

  return {onChange, value, items: years, width: 80};
};

export const Years: React.FC<RequiredQA> = () => {
  const dropdownProps = useYears();

  return <Dropdown {...dropdownProps} />;
};
