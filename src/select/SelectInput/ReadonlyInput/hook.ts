import {useContext, useEffect, useState} from 'react';

import {SelectContext} from 'select/Select';
import {getValueLabel} from 'select/utils';

import type {InputProps} from 'input';
import type {FocusEventHandler} from 'react';

export const useReadonlyInput = (props: Omit<InputProps, 'value' | 'onChange'>) => {
  const context = useContext(SelectContext);
  const {value, options, multiple, noWrap} = context;

  const [inputValue, setInputValue] = useState<string>('');

  const onChange = () => {};

  const onFocus: FocusEventHandler<HTMLInputElement> = e => {
    if (context.disabled || context.readOnly) {
      return;
    }

    context.setIsOpen(true);
    props.onFocus?.(e);
  };

  const onClearClick: InputProps['onClearClick'] = e => {
    context.onClear();
    props.onClearClick?.(e);
  };

  const inputProps = {
    ...props,

    onChange,
    onFocus,
    onClearClick,

    value: inputValue,

    filled: !!value.length,
    focused: context.isOpen,
  } as InputProps;

  useEffect(() => {
    setInputValue(multiple ? '' : getValueLabel(options, value));
  }, [multiple, value, options]);

  return {inputProps, multiple, noWrap};
};
