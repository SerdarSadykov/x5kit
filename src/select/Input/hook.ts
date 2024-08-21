import {FocusEventHandler, ForwardedRef, useContext, useRef, useState} from 'react';

import {InputProps} from 'input';

import {SelectContext} from '../Select';
import {SelectSingleValue, SelectState} from '../types';

export const useInputValue = () => {
  const {options, setOptions, setState, filter} = useContext(SelectContext);
  const [inputValue, setInputValue] = useState('');

  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const onChange: InputProps['onChange'] = e => {
    const newValue = e.target.value;

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    if (!filter) {
      setInputValue('');
      return;
    }

    setInputValue(newValue);

    if (!newValue) {
      setState(SelectState.default);
      setOptions({all: options.all, filtred: []});
      return;
    }

    const request = async () => {
      try {
        setState(SelectState.loading);

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
        console.log(e);
      } finally {
        setState(SelectState.filtred);
        console.log('sss');
      }
    };

    timeout.current = setTimeout(request, filter.delay ?? 500);
  };

  return {inputValue, onChange};
};

export const useInput = (props: Omit<InputProps, 'value' | 'onChange'>, ref: ForwardedRef<HTMLInputElement>) => {
  const {setIsOpen, value, filter} = useContext(SelectContext);
  const {inputValue, onChange} = useInputValue();

  const onFocus: FocusEventHandler<HTMLInputElement> = e => {
    setIsOpen(true);
    props.onFocus?.(e);
  };

  const inputProps = {
    ...props,

    ref,
    onChange,
    onFocus,

    value: inputValue,

    filled: !!inputValue || !!value.length,

    readOnly: !filter,
  } as InputProps;

  return inputProps;
};