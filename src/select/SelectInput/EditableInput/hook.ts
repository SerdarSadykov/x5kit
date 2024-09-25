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
    noWrap,
    isOpen,
    state,
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
      return;
    }

    const request = async () => {
      try {
        setState(SelectState.searching);

        const newFiltred = await filter.callback(newValue, options);

        const currentOptionValues = options.reduce(
          (acc, option) => {
            acc[option.value] = true;
            return acc;
          },
          {} as Record<SelectSingleValue, true>
        );

        const newOptions = newFiltred.filter(option => !currentOptionValues[option.value]);

        if (newOptions.length) {
          setOptions([...options, ...newOptions]);
        }

        setState(SelectState.filtred, newFiltred);
      } catch (e) {
        setState(SelectState.default);

        // eslint-disable-next-line  no-console
        console.error(e);
      }
    };

    timeout.current = setTimeout(request, filter.delay ?? 500);
  };

  const onFocus: FocusEventHandler<HTMLInputElement> = e => {
    if (context.disabled || context.readOnly) {
      return;
    }

    setInputValue('');

    setState(SelectState.default);

    context.setIsOpen(true);
    props.onFocus?.(e);
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = e => {
    props.onBlur?.(e);

    if (multiple) {
      return;
    }

    if (!inputValue) {
      setInputValue(getValueLabel(context));

      return;
    }

    const sameLabelOption = findOptionByLabel(options, inputValue.toLowerCase());
    if (sameLabelOption && !sameLabelOption.disabled && !sameLabelOption.readOnly) {
      // same value
      if (value.includes(sameLabelOption.value)) {
        return;
      }

      // new value
      context.onChange([sameLabelOption.value]);
      return;
    }

    setInputValue(getValueLabel(context));
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
    if (multiple) {
      return;
    }

    setInputValue(getValueLabel(context));
  }, [value]);

  useEffect(() => {
    if (isOpen || state === SelectState.default) {
      return;
    }

    setState(SelectState.default);

    if (multiple) {
      setInputValue('');
    }
  }, [isOpen, state, multiple]);

  return {inputProps, multiple, noWrap};
};