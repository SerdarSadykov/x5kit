//eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {SizeTokenValue} from 'theme';

import type {InputHTMLAttributes, PropsWithChildren, ReactNode} from 'react';
import type {CSSObject} from '@emotion/react';
import type {QA} from 'common';

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
} & QA &
  PropsWithChildren &
  SwitchStyles &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'size'>;
