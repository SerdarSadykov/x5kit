import {useContext, useEffect, useRef, useState} from 'react';

import {SelectContext} from 'select/Select';
import {SelectState} from 'select/types';
import {findOptionByLabel, getValueLabel} from 'select/utils';

import type {InputProps} from 'input';
import type {FocusEventHandler} from 'react';

export const useEditableInput = (props: Omit<InputProps, 'value' | 'onChange'>) => {
  const context = useContext(SelectContext);
  const {value, options, filterOptions, setState, filter, multiple, noWrap, isOpen} = context;

  const [inputValue, setInputValue] = useState('');

  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const onChange: InputProps['onChange'] = e => {
    const newValue = e.target.value;

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setInputValue(newValue);

    if (!newValue) {
      setState(SelectState.default);
      return;
    }

    timeout.current = setTimeout(() => filterOptions(newValue), filter?.delay ?? 500);
  };

  const onFocus: FocusEventHandler<HTMLInputElement> = e => {
    if (context.disabled || context.readOnly) {
      return;
    }

    setInputValue('');

    setState(SelectState.default, []);

    context.setIsOpen(true);
    props.onFocus?.(e);
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = e => {
    props.onBlur?.(e);

    if (multiple || !inputValue) {
      //if multiple, clear on closed
      //if single, set cur value on closed
      return;
    }

    const sameLabelOption = findOptionByLabel(options, inputValue.toLowerCase());
    if (sameLabelOption && !sameLabelOption.disabled && !sameLabelOption.readOnly) {
      // has same value
      if (value.includes(sameLabelOption.value)) {
        return;
      }

      // new value
      context.onChange([sameLabelOption.value]);
      return;
    }
  };

  const onClearClick: InputProps['onClearClick'] = e => {
    context.onClear();
    props.onClearClick?.(e);
  };

  const inputProps = {
    ...props,

    onChange,
    onFocus,
    onBlur,
    onClearClick,

    value: inputValue,

    filled: !!inputValue || !!value.length,
    focused: context.isOpen,
  } as InputProps;

  useEffect(() => {
    if (isOpen) {
      return;
    }

    //if closed and multiple, clear
    //if closed and single, set label
    setInputValue(multiple ? '' : getValueLabel(options, value));
  }, [multiple, value, options, isOpen]);

  return {inputProps, multiple, noWrap};
};
