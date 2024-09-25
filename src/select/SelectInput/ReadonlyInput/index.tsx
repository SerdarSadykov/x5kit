import {forwardRef} from 'react';

import {Input, InputProps} from 'input';

import {InputChips} from '../InputChips';
import {InputText} from '../InputText';
import {InputTextNoWrap} from '../InputTextNoWrap';
import {useReadonlyInput} from './hook';

export const ReadonlyInput = forwardRef<HTMLInputElement, Omit<InputProps, 'value' | 'onChange'>>((props, ref) => {
  const {inputProps, multiple, noWrap} = useReadonlyInput(props);

  let inputComponent = noWrap ? InputTextNoWrap : InputText;

  if (multiple) {
    inputComponent = InputChips;
  }

  return <Input ref={ref} inputComponent={inputComponent} {...inputProps} />;
});
