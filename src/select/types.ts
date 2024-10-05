import type {ReactNode, ChangeEvent, PropsWithChildren, HTMLAttributes} from 'react';
import type React from 'react';
import type {CSSObject} from '@emotion/react';
import type {VariableSizeListProps} from 'react-window';

import type {InputProps} from 'input';
import type {getQAAttribute, QA, RequiredQA} from 'common';
import type {DropdownProps} from 'dropdown';
import type {CheckboxTreeOption} from 'checkboxTree';

export type SelectSingleValue = string | number;
export type SelectMultipleValue = SelectSingleValue[];

export type SelectOption = {
  label: string;
  icon?: ReactNode;
  childs?: SelectOption[];
} & PropsWithChildren &
  Omit<CheckboxTreeOption, 'label'>;

export type SelectItemProps = {
  option: SelectOption;
  checked: boolean; // isActive
} & Pick<SelectContextProps, 'onChange' | 'setIsOpen'> &
  Pick<HTMLAttributes<HTMLDivElement>, 'style'>;

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
    | 'loadMore'
  > &
  Pick<SelectComponents, 'item'>;

export type SelectListProps = {
  components?: SelectComponents;
};
export type SelectListOnChange = (
  value: SelectMultipleValue,
  target?: SelectOption,
  event?: ChangeEvent<HTMLInputElement>
) => void;

export type SelectSingleOnChange = (
  value: SelectSingleValue,
  target?: SelectOption,
  event?: ChangeEvent<HTMLInputElement>
) => void;

export type LastResult = {
  options: SelectOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};

export type LoadMore<T extends LastResult = LastResult> = (options: SelectOption[], lastResult?: T) => Promise<T>;

export type SelectFilter<T extends LastResult = LastResult> = {
  cb: (query: string, options: SelectOption[], lastResult?: T) => Promise<T>;
  delay?: number;
};

export enum SelectState {
  default = 'default',
  searching = 'searching',
  filtred = 'filtred',
  loadingMore = 'loadingMore',
}

type SelectComponents = {
  hint?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;

  searching?: ReactNode;
  notFound?: ReactNode;

  list?: React.FC<SelectListProps>;
  items?: React.FC<SelectItemsProps>;
  item?: React.FC<SelectItemProps>;
};

type CommonProps<T extends LastResult = LastResult> = {
  value: SelectMultipleValue;
  onChange: SelectListOnChange;

  multiple?: boolean;
  showChips?: number;
  noWrap?: boolean;

  filter?: SelectFilter<T>;

  virtualize?: VariableSizeListProps | boolean;
} & Pick<InputProps, 'disabled' | 'readOnly'> &
  Pick<CSSObject, 'whiteSpace'>;

export type SelectProps<T extends LastResult = LastResult> = {
  options: SelectOption[];

  dropdownProps?: Partial<DropdownProps>;

  onLoadMore?: LoadMore<T>;
} & QA &
  CommonProps<T> &
  SelectListProps &
  Omit<InputProps, 'value' | 'onChange'> &
  Partial<Pick<DropdownProps, 'isOpen' | 'setIsOpen'>>;

export type SelectContextProps = {
  options: SelectOption[];
  filtred: SelectOption[];

  state: SelectState;
  setState: (state: SelectState, filtred?: SelectOption[]) => void;

  getQA: ReturnType<typeof getQAAttribute>;

  onClear: () => void;

  loadMore: (target: HTMLDivElement | undefined) => void;
  filterOptions: (query: string) => void;
} & CommonProps &
  Pick<DropdownProps, 'isOpen' | 'setIsOpen' | 'height'> &
  Required<Pick<DropdownProps, 'maxHeight'>>;

export type SingleSelectProps<T extends LastResult = LastResult> = {
  value: SelectSingleValue | undefined;
  onChange: SelectSingleOnChange;
} & Omit<SelectProps<T>, 'value' | 'onChange' | 'multiple'>;
