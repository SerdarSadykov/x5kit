import {FocusEventHandler, useContext, useEffect, useState} from 'react';

import {InputProps} from 'input';
import {SelectContext} from 'select/Select';
import {getValueLabel} from 'select/utils';

export const useReadonlyInput = (props: Omit<InputProps, 'value' | 'onChange'>) => {
  const context = useContext(SelectContext);
  const {value, multiple, noWrap} = context;

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
    setInputValue(multiple ? '' : getValueLabel(context));
  }, [multiple, value]);

  return {inputProps, multiple, noWrap};
};