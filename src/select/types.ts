import React, {MouseEventHandler, ChangeEventHandler, ReactNode, ChangeEvent} from 'react';

import {Placement, SizeTokenValue} from 'theme';
import {InputProps} from 'input';
import {getQAAttribute, QA, RequiredQA} from 'common';
import {DropdownProps} from 'dropdown';
import {CheckboxTreeOption, CheckboxTreeOptionValue} from 'checkboxTree';

export type SelectSingleValue = CheckboxTreeOptionValue;
export type SelectMultipleValue = SelectSingleValue[];
export type SelectValue = SelectSingleValue | SelectMultipleValue | undefined;

export type SelectInternalValue = SelectSingleValue[];

export type SelectOption = {
  icon?: ReactNode;
  childs?: SelectOption[];
} & CheckboxTreeOption;

export type HandleOptionClick = (event, option: SelectOption) => void;

export type RenderOptionFn = {
  (option: SelectOption, isActive: boolean, onClick: HandleOptionClick): ReactNode;
};

export type SelectListOnChange =
  (value: SelectValue, target: SelectOption, event: ChangeEvent<HTMLInputElement>) => void;

// export interface SelectListProps extends QA {
//   id?: string;
//   items: SelectOption[];
//   selected: SelectValue;
//   multiple?: boolean;
//   highlighted?: boolean;
//   noWrap?: boolean;
//   footer?: ReactNode;
//   header?: ReactNode;
//   hint?: string;
//   inputValue?: string;
//   renderOption?: RenderOptionFn;
//   onChange: SelectListPropsOnChange;
// }

//
// export interface SelectChipProps extends Pick<SelectProps, 'size' | 'disabled' | 'onClearClick'> {
//   count: number;
// }


// export type SelectAdornmentProps = {
//   clearable: boolean;
//   opened: boolean;
//   size: SizeTokenValue;
//   onClick: MouseEventHandler;
// };

export type SelectFilter = {
  callback: (query: string, options: SelectOption[]) => Promise<SelectOption[]>;
  delay?: number;
};

export enum SelectState {
  default = 'default',
  loading = 'loading',
  filtred = 'filtred',
}

export type SelectListProps = {
  hint?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  searching: ReactNode;
  notFound: ReactNode;
  itemComponent?: React.FC;
};

export type SelectProps = {
  options: SelectOption[];

  value: SelectInternalValue;
  onChange: SelectListOnChange;

  filter?: SelectFilter;

  dropdownProps?: Partial<DropdownProps>;

  listComponent?: React.FC;

  multiple?: boolean;

  // name?: string;
  // size?: SizeTokenValue;
  // label?: string;
  // options: SelectOption[];
  // value: SelectValue;
  // noWrap?: boolean;
  // disabled?: boolean;

  // inputProps?: Omit<InputProps, 'value' | 'onChange'>;

  // filter?: string;
  // inputClasses?: Record<'root', string>;
  // isOpen?: boolean;
  // preMatching?: boolean;

  // placement?: Placement;
  // dropdownWidth?: DropdownProps['width'];
  // onOpen?: (opened: boolean) => void;
  // onFilterChange?: ChangeEventHandler<HTMLInputElement>;
  // onClearFilterClick?: MouseEventHandler;
  // onClearClick?: MouseEventHandler;
} & QA
  & Omit<InputProps, 'value' | 'onChange'>
  & Partial<Pick<DropdownProps, 'isOpen' | 'setIsOpen'>>
  & SelectListProps;

export type SelectInternalOptions = {
  all: SelectOption[];
  filtred: SelectOption[];
};

export type SelectContextProps = {
  options: SelectInternalOptions,
  setOptions: (options: SelectInternalOptions) => void;

  state: SelectState;
  setState: (state: SelectState) => void;

  getQA: ReturnType<typeof getQAAttribute>;
} & Pick<SelectProps, 'value' | 'onChange' | 'multiple' | 'filter'>
  & Pick<DropdownProps, 'isOpen' | 'setIsOpen'>
  & SelectListProps;