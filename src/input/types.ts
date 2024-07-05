import {MaskaDetail, MaskOptions} from 'maska';
import {InputHTMLAttributes, MouseEventHandler, ReactNode} from 'react';

import {SizeTokenValue} from 'theme';

export type InputStyles = {
  size?: SizeTokenValue;

  disabled?: boolean;
  filled?: boolean;
  focused: boolean;
  unborder?: boolean;
  loading?: boolean;

  error?: boolean | string;
};

export type InputProps = {
  label?: string | React.FC<InputStyles>;
  caption?: string | ReactNode;

  value: string | undefined;

  endAdornment?: ReactNode;
  startAdornment?: ReactNode;

  onClearClick?: MouseEventHandler<HTMLButtonElement>;

  // forbidTyping?: boolean; - readonly
  // textError?: string - error;
  // isAbsoluteCaption?: boolean;
  // autoFocus?: boolean;
} & InputStyles & Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>;

export type MaskedInputProps = Omit<InputProps, 'onChange'> & {
  mask: MaskOptions;
  onChange: ({target, detail}: {target: HTMLInputElement, detail: MaskaDetail}) => void;
};

export type InputInternalProps<T = InputProps | MaskedInputProps> = T & {
  styles: InputStyles;
};