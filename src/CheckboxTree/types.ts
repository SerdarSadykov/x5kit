import type {ChangeEvent, HTMLAttributes, InputHTMLAttributes, ReactNode} from 'react';

import type {QA} from 'common';
import type {TooltipProps} from 'Tooltip';
import type {CheckboxProps} from 'Checkbox';

export type CheckboxTreeOptionValue = string | number;

export type CheckboxTreeOption = {
  label: ReactNode;
  value: CheckboxTreeOptionValue;
  childs?: CheckboxTreeOption[];
  tooltip?: TooltipProps['content'];

  // isVisible?: boolean; removed
  // parent?: CheckboxTreeOption removed
} & Omit<CheckboxProps, 'label' | 'value' | 'checked'>;

export type CheckboxTreeOnChange<T = CheckboxTreeOption> = (
  value: CheckboxTreeOptionValue[],
  target: T,
  event: ChangeEvent<HTMLInputElement>
) => void;

export type CheckboxTreeProps<T extends CheckboxTreeOption = CheckboxTreeOption> = {
  options: T[];
  value: CheckboxTreeOptionValue[] | undefined;
  onChange: CheckboxTreeOnChange<T>;

  disabled?: boolean;
  readOnly?: boolean;

  opened?: CheckboxTreeOptionValue[];
  toggleOpened?: (value: CheckboxTreeOptionValue) => void;

  // onlyUserSelected?: boolean; removed
  // searchStr?: string; removed
  // showNotFound?: boolean; removed
} & QA &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'name'>;
