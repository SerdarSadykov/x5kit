import type {InputHTMLAttributes, MouseEventHandler, ReactNode, Ref, RefCallback} from 'react';
import type {MaskInputOptions} from 'maska';

import type {CSSObject} from '@emotion/react';

import type {SizeTokenValue} from 'theme';
import type {QA} from 'common';

type InputBaseProps<T> = Pick<
  InputHTMLAttributes<T>,
  | 'type'
  | 'name'
  | 'disabled'
  | 'readOnly'
  | 'required'
  | 'autoFocus'
  | 'autoComplete'
  | 'onFocus'
  | 'onBlur'
  | 'onClick'
  | 'onInput'
  | 'onChange'
  | 'tabIndex'
>;

export type InputInputComponent<T = HTMLInputElement> = React.FC<InputInternalProps<T>>;

export type InputProps<T = HTMLInputElement> = {
  size?: SizeTokenValue;

  filled?: boolean;
  focused?: boolean;
  unborder?: boolean;
  overflowTooltip?: boolean;
  loading?: boolean;
  absoluteCaption?: boolean;
  error?: boolean | ReactNode;

  caption?: ReactNode;
  label?: string | React.FC<InputStyles & Pick<InputProps<T>, 'error'>>;

  value: string | undefined;

  startAdornment?: ReactNode;
  endAdornment?: ReactNode;

  onClearClick?: MouseEventHandler<HTMLButtonElement>;

  mask?: MaskInputOptions;

  containerRef?: Ref<HTMLDivElement>;

  inputProps?: InputHTMLAttributes<T> & {ref?: RefCallback<T>};
  inputComponent?: InputInputComponent<T>;

  // forbidTyping?: boolean; - readonly
  // textError?: string - error;
  // isAbsoluteCaption?: boolean;
  // autoFocus?: boolean;
} & QA &
  InputBaseProps<T> &
  Pick<CSSObject, 'width'>;

export type InputStyles = {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isFilled?: boolean;
  isFocused: boolean;
  isUnborder?: boolean;
  isOverflowTooltip?: boolean;
  isLoading?: boolean;
  isLabeled: boolean;
  isMasked: boolean;
  isSmall: boolean;
  isError: boolean;
  isAbsoluteCaption: boolean;
};

export type InputInternalProps<T = HTMLInputElement> = InputProps<T> & {
  style: InputStyles;
};
