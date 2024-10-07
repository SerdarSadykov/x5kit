import {forwardRef} from 'react';

import {Input} from 'Input';

import {InputChips} from '../InputChips';
import {NoWrapInput} from '../NoWrapInput';
import {WrapInput} from '../WrapInput';

import {useReadonlyInput} from './hook';

import type {InputProps} from 'Input';

export const ReadonlyInput = forwardRef<HTMLInputElement, Omit<InputProps, 'value' | 'onChange'>>((props, ref) => {
  const {inputProps, multiple, noWrap} = useReadonlyInput(props);

  let inputComponent = noWrap ? WrapInput : NoWrapInput;

  if (multiple) {
    inputComponent = InputChips;
  }

  return <Input ref={ref} inputComponent={inputComponent} {...inputProps} />;
});
