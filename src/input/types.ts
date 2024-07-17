import {ChangeEventHandler, InputHTMLAttributes, MouseEventHandler, ReactNode, RefCallback} from 'react';
import {MaskInputOptions} from 'maska';

import {SizeTokenValue} from 'theme';

type ReactComponentProp = React.FC<InputStyles & Pick<InputProps, 'error'>>;

export type InputProps = {
  size?: SizeTokenValue;

  width?: number | string;

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

  startAdornment?: ReactNode;
  endAdornment?: ReactNode;

  onClearClick?: MouseEventHandler<HTMLButtonElement>;

  mask?: MaskInputOptions;

  inputProps?: InputHTMLAttributes<HTMLInputElement> & {ref?: RefCallback<HTMLInputElement>};
  inputComponent?: React.FC<InputInternalProps>;

  // forbidTyping?: boolean; - readonly
  // textError?: string - error;
  // isAbsoluteCaption?: boolean;
  // autoFocus?: boolean;
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'type' | 'disabled' | 'required' | 'readOnly' | 'autoFocus' | 'autoComplete'>;

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
