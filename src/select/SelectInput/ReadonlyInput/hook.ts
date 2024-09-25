import {FocusEventHandler, useContext, useEffect, useState} from 'react';

import {InputProps} from 'input';
import {SelectContext} from 'select/Select';

import {getValueLabel} from '../utils';

export const useReadonlyInput = (props: Omit<InputProps, 'value' | 'onChange'>) => {
  const context = useContext(SelectContext);
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

    focused: context.isOpen,
  } as InputProps;

  useEffect(() => {
    if (context.multiple) {
      setInputValue('');
      return;
    }

    setInputValue(getValueLabel(context));
  }, [context.multiple, context.value]);

  return {
    inputProps,
    multiple: context.multiple,
    noWrap: context.noWrap,
  };
};