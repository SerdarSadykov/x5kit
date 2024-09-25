import {forwardRef} from 'react';

import {Input as BaseInput, InputProps} from 'input';
import {Textarea, TextareaProps} from 'textarea';

import {useInput} from './hook';
import {InputChips} from './InputChips';
import {InputText} from './InputText';

export const SelectInput = forwardRef<HTMLInputElement, Omit<InputProps, 'value' | 'onChange'>>((props, baseRef) => {
  const {ref, inputProps, multiple, noWrap} = useInput(props, baseRef);

  if (noWrap) {
    return <Textarea minHeight={0} ref={ref} {...inputProps as TextareaProps} />
  }

  const inputComponent = multiple ? InputChips : undefined;

  return <BaseInput ref={ref} inputComponent={inputComponent} {...inputProps} />;
});
