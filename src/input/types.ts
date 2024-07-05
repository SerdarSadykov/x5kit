import {InputHTMLAttributes, MouseEventHandler, ReactNode} from 'react';
import {MaskInputOptions} from 'maska';

import {SizeTokenValue} from 'theme';

export type InputStyles = {
  size?: SizeTokenValue;

  error?: boolean | string;

  disabled?: boolean;
  filled?: boolean;
  focused?: boolean;
  unborder?: boolean;
  loading?: boolean;
};

export type InputProps = {
  label?: string | React.FC<InputProps>;
  caption?: string | ReactNode;

  value: string | undefined;

  endAdornment?: ReactNode;
  startAdornment?: ReactNode;

  onClearClick?: MouseEventHandler<HTMLButtonElement>;

  mask: MaskInputOptions;

  // forbidTyping?: boolean; - readonly
  // textError?: string - error;
  // isAbsoluteCaption?: boolean;
  // autoFocus?: boolean;
} & InputStyles & Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>;

export type InputInternalProps = {
  style: InputStyles & {labeled: boolean};
  props: Omit<InputProps, keyof InputStyles>;
}