import {InputProps} from 'input';

export type DatepickerProps = Omit<InputProps, 'startAdornment' | 'onClearClick'>;
