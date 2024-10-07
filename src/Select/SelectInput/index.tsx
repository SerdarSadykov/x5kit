import {forwardRef, useContext} from 'react';

import {SelectContext} from 'Select/Select';

import {EditableInput} from './EditableInput';
import {ReadonlyInput} from './ReadonlyInput';

import type {InputProps} from 'Input';

export const SelectInput = forwardRef<HTMLInputElement, Omit<InputProps, 'value' | 'onChange'>>((props, ref) => {
  const context = useContext(SelectContext);

  const Component = context.filter ? EditableInput : ReadonlyInput;

  return <Component ref={ref} {...props} />;
});
