import {InputHTMLAttributes, MouseEventHandler, ReactNode} from 'react';

import {SizeTokenValue} from 'theme';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string | ReactNode;
  caption?: string | ReactNode;

  size?: SizeTokenValue;

  filled?: boolean;
  unborder?: boolean;
  loading?: boolean;

  error?: boolean | string;

  endAdornment?: ReactNode;
  startAdornment?: ReactNode;

  clear?: boolean;
  onClearClick?: MouseEventHandler<HTMLButtonElement>;

  // forbidTyping?: boolean; - readonly
  // textError?: string - error;
  // isAbsoluteCaption?: boolean;
  // autoFocus?: boolean;
};

export type InputStyles = Pick<InputProps, 'error' | 'filled' | 'unborder' | 'loading'> & {
  focused: boolean;
};
