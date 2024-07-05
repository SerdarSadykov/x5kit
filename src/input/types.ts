import {ChangeEventHandler, InputHTMLAttributes, MouseEventHandler, ReactNode} from 'react';
import {MaskInputOptions} from 'maska';

import {SizeTokenValue} from 'theme';

export type InputProps = {
  size?: SizeTokenValue;

  width?: number | string;

  disabled?: boolean;
  filled?: boolean;
  focused?: boolean;
  unborder?: boolean;
  loading?: boolean;
  error?: boolean | string;

  label?: string | React.FC<InputStyles>;
  caption?: string | ReactNode;

  value: string | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;

  endAdornment?: ReactNode;
  startAdornment?: ReactNode;

  onClearClick?: MouseEventHandler<HTMLButtonElement>;

  mask: MaskInputOptions;

  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputProps>;

  // forbidTyping?: boolean; - readonly
  // textError?: string - error;
  // isAbsoluteCaption?: boolean;
  // autoFocus?: boolean;
};

export type InputStyles = {
  isDisabled?: boolean;
  isFilled?: boolean;
  isFocused: boolean;
  isUnborder?: boolean;
  isLoading?: boolean;
  isLabeled: boolean;
  isMasked: boolean;
  isSmall: boolean;
  isError: boolean;
};

export type InputInternalProps = InputProps & {
  style: InputStyles;
};
