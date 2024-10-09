import {createContext, forwardRef, useCallback, useEffect, useState} from 'react';

import {Dropdown} from 'Dropdown';

import {SelectInput} from './SelectInput';
import {SelectList} from './SelectList';
import {useSelect} from './hook';

import type {
  SelectContextProps,
  SelectProps,
  SingleSelectProps,
  SelectMultipleValue,
  SelectListOnChange,
} from './types';

export const SelectContext = createContext<SelectContextProps>({} as never);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Select = forwardRef<HTMLInputElement, SelectProps<any>>((props, baseRef) => {
  const {ref, inputProps, context, dropdownProps, components} = useSelect(props, baseRef);

  const List = components?.list || SelectList;

  return (
    <SelectContext.Provider value={context}>
      <SelectInput ref={ref} {...inputProps} />

      <Dropdown {...dropdownProps}>
        <List components={components} />
      </Dropdown>
    </SelectContext.Provider>
  );
});

export const SingleSelect = forwardRef<HTMLInputElement, SingleSelectProps>((props, ref) => {
  const [value, setValue] = useState<SelectMultipleValue>([]);

  const onChange = useCallback<SelectListOnChange>(
    (newValue, ...rest) => {
      props.onChange(newValue[0], ...rest);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onChange]
  );

  useEffect(() => {
    setValue(props.value ? [props.value] : []);
  }, [props.value]);

  return <Select ref={ref} {...props} value={value} onChange={onChange} />;
});
