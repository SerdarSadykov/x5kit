import {FocusEventHandler, ForwardedRef, useContext, useEffect, useRef, useState} from 'react';

import {InputProps} from 'input';

import {SelectContext} from '../Select';
import {SelectSingleValue, SelectState} from '../types';
import {findOptionByLabel, findOptions} from './utils';

export const useInputValue = (props: Pick<InputProps, 'onBlur'>) => {
  const context = useContext(SelectContext);
  const {value, options, setOptions, setState, filter, multiple} = context;

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
        console.log(e);
      } finally {
        setState(SelectState.filtred);
      }
    };

    timeout.current = setTimeout(request, filter.delay ?? 500);
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = e => {
    props.onBlur?.(e);

    // setOptions({all: options.all, filtred: []});
    // setState(SelectState.default);

    // if (multiple) {
    //   setInputValue('');
    //   return;
    // }

    // if (!inputValue) {
    //   context.onClear();

    //   return;
    // }

    // const sameLabelOption = findOptionByLabel(options.all, inputValue.toLowerCase());
    // if (sameLabelOption && !sameLabelOption.disabled && !sameLabelOption.readOnly) {
    //   if (value.includes(sameLabelOption.value)) {
    //     return;
    //   }

    //   context.onChange([sameLabelOption.value]);
    //   return;
    // }

    // if (value.length) {
    //   context.onClear();
    // }

    // setInputValue('');
  };

  useEffect(() => {
    if (multiple) {
      return;
    }

    const selectedLabel = findOptions(options.all, value, 1)[0]?.label;
    setInputValue(selectedLabel ?? '');
  }, [value]);

  return {inputValue, onChange, onBlur};
};

export const useInput = (props: Omit<InputProps, 'value' | 'onChange'>, ref: ForwardedRef<HTMLInputElement>) => {
  const context = useContext(SelectContext);

  const {inputValue, onChange, onBlur} = useInputValue(props);

  const onFocus: FocusEventHandler<HTMLInputElement> = e => {
    context.setIsOpen(true);
    props.onFocus?.(e);
  };

  const onClearClick: InputProps['onClearClick'] = e => {
    context.onClear();
    props.onClearClick?.(e);
  };

  const inputProps = {
    ...props,

    ref,
    onChange,
    onFocus,
    onBlur,
    onClearClick,

    value: inputValue,

    filled: !!inputValue || !!context.value.length,

    readOnly: !context.filter,
  } as InputProps;

  return {inputProps, multiple: context.multiple};
};