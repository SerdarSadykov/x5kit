import {useContext, useState} from 'react';

import {setMonth, setYear} from 'date-fns';

import {getQAAttribute} from 'common';
import {CalendarContext} from 'calendar';

import {BlockContext} from 'calendar/Block';

import type {DropdownItem, DropdownOpenProps, DropdownProps} from 'calendar/Dropdown/types';
import type {RequiredQA} from 'common';
import type {Month} from 'date-fns';

import type {HeaderDateType} from '../types';

export const useMonths = (): Omit<DropdownProps, keyof DropdownOpenProps> => {
  const {locale, months, onChangeViewDate} = useContext(CalendarContext);
  const {viewDate} = useContext(BlockContext);

  const value: DropdownItem = {
    name: locale.localize.month(viewDate.getMonth() as Month),
    value: viewDate.getMonth(),
    disabled: false,
  };

  const onChange = (newItem: DropdownItem) => {
    onChangeViewDate(setMonth(viewDate, newItem.value));
  };

  return {onChange, value, items: months, width: 112, tooltip: 'Выбор месяца'};
};

export const useYears = (): Omit<DropdownProps, keyof DropdownOpenProps> => {
  const {years, onChangeViewDate} = useContext(CalendarContext);
  const {viewDate} = useContext(BlockContext);

  const value: DropdownItem = {
    name: String(viewDate.getFullYear()),
    value: viewDate.getFullYear(),
    disabled: false,
  };

  const onChange = (newItem: DropdownItem) => {
    onChangeViewDate(setYear(viewDate, newItem.value));
  };

  return {onChange, value, items: years, width: 80, tooltip: 'Выбор года'};
};

export const useHeaderDateDropdown = ({qa}: RequiredQA) => {
  const [isOpen, setIsOpen] = useState<HeaderDateType>();

  const getQA = getQAAttribute(qa);

  const getDropdownProps = (dropdown: HeaderDateType): DropdownOpenProps & RequiredQA => ({
    qa: getQA(dropdown),
    isOpen: isOpen === dropdown,
    setIsOpen: newIsOpen => setIsOpen(newIsOpen && isOpen !== dropdown ? dropdown : undefined),
  });

  return getDropdownProps;
};
