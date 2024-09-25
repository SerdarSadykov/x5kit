import React, {ReactNode, ChangeEvent, PropsWithChildren, HTMLAttributes} from 'react';
import {CSSObject} from '@emotion/react';
import {VariableSizeListProps} from 'react-window';

import {InputProps} from 'input';
import {getQAAttribute, QA, RequiredQA} from 'common';
import {DropdownProps} from 'dropdown';
import {CheckboxTreeOption, CheckboxTreeOptionValue} from 'checkboxTree';

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
} & RequiredQA
  & Pick<
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
  & Pick<SelectComponents, 'item'>;

export type SelectItemProps = {
  option: SelectOption;
  checked: boolean; // isActive
} & Pick<SelectContextProps, 'onChange' | 'setIsOpen'> & Pick<HTMLAttributes<HTMLDivElement>, 'style'>;

export type SelectListOnChange =
  (value: SelectInternalValue, target?: SelectOption, event?: ChangeEvent<HTMLInputElement>) => void;

export type SelectFilter = {
  callback: (query: string, options: SelectOption[]) => Promise<SelectOption[]>;
  delay?: number;
};

export enum SelectState {
  default = 'default',
  searching = 'searching',
  filtred = 'filtred',
}

type SelectComponents = {
  hint?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;

  searching?: ReactNode;
  notFound?: ReactNode;

  list?: React.FC;
  items?: React.FC<SelectItemsProps>;
  item?: React.FC<SelectItemProps>;
};

type CommonProps = {
  value: SelectInternalValue;
  onChange: SelectListOnChange;

  multiple?: boolean;
  showChips?: number;
  noWrap?: boolean;

  filter?: SelectFilter;

  virtualize?: VariableSizeListProps | boolean;

  components?: SelectComponents;
} & Pick<InputProps, 'disabled' | 'readOnly'> & Pick<CSSObject, 'whiteSpace'>;

export type SelectProps = {
  options: SelectOption[];

  dropdownProps?: Partial<DropdownProps>;
} & QA
  & CommonProps
  & Omit<InputProps, 'value' | 'onChange'>
  & Partial<Pick<DropdownProps, 'isOpen' | 'setIsOpen'>>;

export type SelectContextProps = {
  options: SelectOption[],
  filtred: SelectOption[],

  setOptions: (options: SelectOption[]) => void;

  state: SelectState;
  setState: (state: SelectState, filtred?: SelectOption[]) => void;

  getQA: ReturnType<typeof getQAAttribute>;

  onClear: () => void;
} & CommonProps
  & Pick<DropdownProps, 'isOpen' | 'setIsOpen' | 'height'>
  & Required<Pick<DropdownProps, 'maxHeight'>>;