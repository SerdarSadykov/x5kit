import {ChangeEvent, HTMLAttributes} from 'react';

import {QA} from 'common';
import {CheckboxProps} from 'checkbox/types';

export type CheckboxTreeOptionValue = string | number;

export type CheckboxTreeOption = {
  label: string;
  value: CheckboxTreeOptionValue;
  childs?: CheckboxTreeOption[];

  // isVisible?: boolean;
  // parent?: CheckboxTreeOption
} & Omit<CheckboxProps, 'label' | 'value' | 'checked'>;

export type CheckboxTreeProps = {
  options: CheckboxTreeOption[];
  values: CheckboxTreeOptionValue[] | undefined;
  onChange: (values: CheckboxTreeOptionValue[], event: ChangeEvent<HTMLInputElement>) => void;

  disabled?: boolean;
  readOnly?: boolean;

  opened?: CheckboxTreeOptionValue[];
  toggleOpened?: (value: CheckboxTreeOptionValue) => void;

  // onlyUserSelected?: boolean;
  // searchStr?: string;
  // showNotFound?: boolean;
} & QA & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;
