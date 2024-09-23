import {InputHTMLAttributes, PropsWithChildren, ReactNode} from 'react';
import {CSSObject} from '@emotion/react';

import {QA} from 'common';
import {SizeTokenValue} from 'theme';

export type SwitchState = boolean | 'halfOn';

export type SwitchStyles = {
  checked?: SwitchState;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;

  hasLabel?: boolean;
  size?: SizeTokenValue;
} & Pick<CSSObject, 'whiteSpace'>;

export type SwitchProps = {
  label?: ReactNode;
  startAdornment?: ReactNode;
} & QA & PropsWithChildren & SwitchStyles & Omit<InputHTMLAttributes<HTMLInputElement>, 'checked'>;