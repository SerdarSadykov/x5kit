import {useContext} from 'react';
import {Month, setMonth} from 'date-fns';

import {RequiredQA} from 'common';
import {CalendarContext} from 'calendar';
import {Dropdown, DropdownItem, DropdownProps} from 'calendar/Dropdown';

export const useMonths = (): DropdownProps => {
  const {locale, viewDate, months, onChangeViewDate} = useContext(CalendarContext);

  const value: DropdownItem = {
    name: locale.localize.month(viewDate.getMonth() as Month),
    value: viewDate.getMonth(),
    disabled: false,
  };

  const onChange = (newItem: DropdownItem) => {
    onChangeViewDate(setMonth(viewDate, newItem.value));
  };

  return {onChange, value, items: months, width: 100};
};

export const Months: React.FC<RequiredQA> = () => {
  const dropdownProps = useMonths();

  return <Dropdown {...dropdownProps} />;
};
