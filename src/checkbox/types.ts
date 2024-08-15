import {InputHTMLAttributes, PropsWithChildren, ReactNode} from 'react';

import {QA} from 'common';

export type CheckboxState = boolean | 'halfOn';

export type CheckboxStyles = {
  checked?: CheckboxState;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;

  hasLabel?: boolean;
};

export type CheckboxProps = {
  label?: ReactNode;
} & QA & PropsWithChildren & CheckboxStyles & Omit<InputHTMLAttributes<HTMLInputElement>, 'checked'>;