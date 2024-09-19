import {createContext, forwardRef} from 'react';

import {Dropdown} from 'dropdown';

import {Input} from './Input';
import {SelectList} from './SelectList';
import {useSelect} from './hook';
import {SelectContextProps, SelectProps} from './types';

export const SelectContext = createContext<SelectContextProps>({} as never);

export const Select = forwardRef<HTMLInputElement, SelectProps>((props, baseRef) => {
  const {ref, inputProps, context, dropdownProps} = useSelect(props, baseRef);

  const List = context.components?.list || SelectList;

  return (
    <SelectContext.Provider value={context}>
      <Input ref={ref} {...inputProps} />

      <Dropdown {...dropdownProps}>
        <List />
      </Dropdown>
    </SelectContext.Provider>
  );
});
