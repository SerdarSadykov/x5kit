import React, {MouseEventHandler, ChangeEventHandler, ReactNode, ChangeEvent, PropsWithChildren, HTMLAttributes} from 'react';

import {Placement, SizeTokenValue} from 'theme';
import {InputProps} from 'input';
import {getQAAttribute, QA, RequiredQA} from 'common';
import {DropdownProps} from 'dropdown';
import {CheckboxTreeOption, CheckboxTreeOptionValue, CheckboxTreeProps} from 'checkboxTree';
import {VariableSizeListProps} from 'react-window';
import {CSSObject} from '@emotion/react';

export type SelectSingleValue = CheckboxTreeOptionValue;
export type SelectMultipleValue = SelectSingleValue[];
export type SelectValue = SelectSingleValue | SelectMultipleValue | undefined;

export type SelectInternalValue = SelectSingleValue[];

export type SelectOption = {
  label: string;
  icon?: ReactNode;
  childs?: SelectOption[];
} & PropsWithChildren & Omit<CheckboxTreeOption, 'label'>;;

export type SelectItemsProps = {
  options: SelectOption[];
  clientWidth: number | undefined;
} & RequiredQA &
  Pick<
    SelectContextProps,
    | 'state'
    | 'value'
    | 'onChange'
    | 'multiple'
    | 'setIsOpen'
    | 'height'
    | 'maxHeight'
    | 'virtualize'
    | 'whiteSpace'
  >
  & Pick<SelectListProps, 'itemComponent'>;

export type SelectItemProps = {
  option: SelectOption;
  checked: boolean; // isActive
} & Pick<SelectContextProps, 'onChange' | 'setIsOpen'> & Pick<HTMLAttributes<HTMLDivElement>, 'style'>;

export type SelectListOnChange =
  (value: SelectInternalValue, target?: SelectOption, event?: ChangeEvent<HTMLInputElement>) => void;

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
  searching = 'searching',
  filtred = 'filtred',
}

type SelectListProps = {
  hint?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;

  searching?: ReactNode;
  notFound?: ReactNode;

  itemsComponent?: React.FC<SelectItemsProps>;
  itemComponent?: React.FC<SelectItemProps>;
};

export type SelectProps = {
  options: SelectOption[];

  value: SelectInternalValue;
  onChange: SelectListOnChange;

  filter?: SelectFilter;

  dropdownProps?: Partial<DropdownProps>;

  listComponent?: React.FC;

  multiple?: boolean;
  showChips?: number;

  virtualize?: VariableSizeListProps | boolean;

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
  & Pick<CSSObject, 'whiteSpace'>
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

  onClear: () => void;

} & Pick<SelectProps, 'value' | 'onChange' | 'multiple' | 'disabled' | 'readOnly' | 'showChips' | 'filter' | 'virtualize' | 'whiteSpace'>
  & Pick<DropdownProps, 'isOpen' | 'setIsOpen' | 'height'>
  & Required<Pick<DropdownProps, 'maxHeight'>>
  & SelectListProps;