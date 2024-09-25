import {forwardRef} from 'react';

import {Input as BaseInput, InputProps} from 'input';

import {InputChips} from './InputChips';
import {InputText} from './InputText';
import {InputTextNoWrap} from './InputTextNoWrap';
import {useInput} from './hook';

export const SelectInput = forwardRef<HTMLInputElement, Omit<InputProps, 'value' | 'onChange'>>((props, baseRef) => {
  const {ref, inputProps, multiple, noWrap, isOpen} = useInput(props, baseRef);

  let inputComponent = noWrap && !isOpen ? InputTextNoWrap : InputText;

  if (multiple) {
    inputComponent = InputChips;
  }

  return <BaseInput ref={ref} inputComponent={inputComponent} {...inputProps} />;
});
