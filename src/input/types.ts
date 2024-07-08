import {ChangeEventHandler, HTMLInputAutoCompleteAttribute, InputHTMLAttributes, MouseEventHandler, ReactNode} from 'react';
import {MaskInputOptions} from 'maska';

import {SizeTokenValue} from 'theme';

type ReactComponentProp = React.FC<InputStyles & Pick<InputProps, 'error'>>;

export type InputProps = {
  size?: SizeTokenValue;

  width?: number | string;

  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  filled?: boolean;
  focused?: boolean;
  unborder?: boolean;
  loading?: boolean;
  error?: boolean | string;
  absoluteCaption?: boolean | string;

  label?: string | ReactComponentProp;
  caption?: string | ReactComponentProp;

  value: string | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;

  endAdornment?: ReactNode;
  startAdornment?: ReactNode;

  onClearClick?: MouseEventHandler<HTMLButtonElement>;

  mask: MaskInputOptions;

  inputProps?: InputHTMLAttributes<HTMLInputElement>;

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
  isAbsoluteCaption: boolean;
};

export type InputInternalProps = InputProps & {
  style: InputStyles;
};
