import {forwardRef} from 'react';

import {Input} from 'input';

import {InputChips} from '../InputChips';
import {WrapInputEditable} from '../WrapInput';
import {NoWrapInput} from '../NoWrapInput';

import {useEditableInput} from './hook';

import type {InputProps} from 'input';

export const EditableInput = forwardRef<HTMLInputElement, Omit<InputProps, 'value' | 'onChange'>>((props, ref) => {
  const {inputProps, multiple, noWrap} = useEditableInput(props);

  let inputComponent = noWrap ? WrapInputEditable : NoWrapInput;

  if (multiple) {
    inputComponent = InputChips;
  }

  return <Input ref={ref} inputComponent={inputComponent} {...inputProps} />;
});
