import {useContext} from 'react';
import {setMonth} from 'date-fns';

import {RequiredQA} from 'common';
import {CalendarContext} from 'calendar';
import {Dropdown, DropdownItem, DropdownProps} from 'calendar/Dropdown';

export const useMonths = (): DropdownProps => {
  const {viewDate, months, onChangeViewDate} = useContext(CalendarContext);

  const value: DropdownItem = {
    name: String(viewDate.getMonth()),
    value: viewDate.getMonth(),
    disabled: false,
  };

  const onChange = (newItem: DropdownItem) => {
    onChangeViewDate(setMonth(viewDate, newItem.value));
  };

  return {onChange, items: months, value};
};

export const Months: React.FC<RequiredQA> = () => {
  const dropdownProps = useMonths();

  return <Dropdown {...dropdownProps} />;
};
