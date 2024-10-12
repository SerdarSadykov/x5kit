import type {CSSProperties, TextareaHTMLAttributes} from 'react';
import type {TextareaAutosizeProps} from 'react-textarea-autosize';

import type {InputProps} from 'Input';

export type TextareaProps = {
  /** Свойства элемента textarea */
  inputProps?: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'height' | 'style'> & TextareaAutosizeProps;
} & Pick<CSSProperties, 'width' | 'maxWidth' | 'minHeight' | 'maxHeight' | 'resize'> &
  Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onFocus' | 'onBlur' | 'onClick' | 'onChange'> &
  Omit<
    InputProps<HTMLTextAreaElement>,
    'type' | 'mask' | 'inputProps' | 'onFocus' | 'onBlur' | 'onClick' | 'onChange' | 'startAdornment' | 'endAdornment'
  >;
