import {forwardRef, useContext} from 'react';

import {InputProps} from 'input';
import {SelectContext} from 'select/Select';

import {EditableInput} from './EditableInput';
import {ReadonlyInput} from './ReadonlyInput';

export const SelectInput = forwardRef<HTMLInputElement, Omit<InputProps, 'value' | 'onChange'>>((props, ref) => {
  const context = useContext(SelectContext);

  const Component = context.filter ? EditableInput : ReadonlyInput;

  return <Component ref={ref} {...props} />;
});
