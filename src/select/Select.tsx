import {createContext, forwardRef, useCallback, useEffect, useState} from 'react';

import {Dropdown} from 'dropdown';

import {SelectInput} from './SelectInput';
import {SelectList} from './SelectList';
import {useSelect} from './hook';
import {SelectContextProps, SelectProps, SingleSelectProps, SelectInternalValue, SelectListOnChange} from './types';

export const SelectContext = createContext<SelectContextProps>({} as never);

export const Select = forwardRef<HTMLInputElement, SelectProps>((props, baseRef) => {
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
  const [value, setValue] = useState<SelectInternalValue>([]);

  const onChange = useCallback<SelectListOnChange>(
    (value, target, event) => {
      props.onChange(value[0], target, event);
    },
    [props.onChange]
  );

  useEffect(() => {
    setValue(props.value ? [props.value] : []);
  }, [props.value]);

  return <Select ref={ref} {...props} value={value} onChange={onChange} />;
});
