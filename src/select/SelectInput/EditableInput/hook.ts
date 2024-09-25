import {FocusEventHandler, useContext, useEffect, useRef, useState} from 'react';

import {InputProps} from 'input';
import {SelectContext} from 'select/Select';
import {SelectSingleValue, SelectState} from 'select/types';

import {findOptionByLabel, getValueLabel, } from '../utils';

export const useEditableInput = (props: Omit<InputProps, 'value' | 'onChange'>) => {
  const context = useContext(SelectContext);
  const {
    value,
    options,
    setOptions,
    setState,
    filter,
    multiple,
  } = context;

  const [inputValue, setInputValue] = useState('');

  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const onChange: InputProps['onChange'] = e => {
    const newValue = e.target.value;

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setInputValue(newValue);

    if (!newValue || !filter) {
      setState(SelectState.default);
      setOptions({all: options.all, filtred: []});
      return;
    }

    const request = async () => {
      try {
        setState(SelectState.searching);

        const filtred = await filter.callback(newValue, options.all);

        const currentOptionValues = options.all.reduce(
          (acc, option) => {
            acc[option.value] = true;
            return acc;
          },
          {} as Record<SelectSingleValue, true>
        );

        const newOptions = filtred.filter(option => !currentOptionValues[option.value]);

        const all = newOptions.length ? [...options.all, ...newOptions] : options.all;

        setOptions({all, filtred});
      } catch (e) {
        // eslint-disable-next-line  no-console
        console.error(e);
      } finally {
        setState(SelectState.filtred);
      }
    };

    timeout.current = setTimeout(request, filter.delay ?? 500);
  };

  const onFocus: FocusEventHandler<HTMLInputElement> = e => {
    if (context.disabled || context.readOnly) {
      return;
    }

    setInputValue('');

    context.setIsOpen(true);
    props.onFocus?.(e);
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = e => {
    props.onBlur?.(e);

    setOptions({all: options.all, filtred: []});
    setState(SelectState.default);

    if (multiple) {
      setInputValue('');
      return;
    }

    if (!inputValue) {
      setInputValue(getValueLabel(context));

      return;
    }

    const sameLabelOption = findOptionByLabel(options.all, inputValue.toLowerCase());
    if (sameLabelOption && !sameLabelOption.disabled && !sameLabelOption.readOnly) {
      // same value
      if (value.includes(sameLabelOption.value)) {
        return;
      }

      // new value
      context.onChange([sameLabelOption.value]);
      return;
    }

    // not found, clear
    if (value.length) {
      context.onClear();
    }

    setInputValue('');
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

    filled: !!inputValue || !!context.value.length,
    focused: context.isOpen,
  } as InputProps;

  useEffect(() => {
    if (multiple) {
      setInputValue('');
      return;
    }

    setInputValue(getValueLabel(context));
  }, [value]);

  return {
    inputProps,
    multiple: context.multiple,
    noWrap: context.noWrap,
  };
};