import {InputHTMLAttributes, PropsWithChildren, ReactNode} from 'react';
import {CSSObject} from '@emotion/react';

import {QA} from 'common';

export type CheckboxState = boolean | 'halfOn';

export type CheckboxStyles = {
  checked?: CheckboxState;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;

  hasLabel?: boolean;
} & Pick<CSSObject, 'whiteSpace'>;

export type CheckboxProps = {
  label?: ReactNode;
  startAdornment?: ReactNode;
} & QA & PropsWithChildren & CheckboxStyles & Omit<InputHTMLAttributes<HTMLInputElement>, 'checked'>;