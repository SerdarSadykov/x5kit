import {createContext, forwardRef} from 'react';

import {Dropdown} from 'dropdown';

import {Input} from './Input';
import {SelectList} from './SelectList';
import {useSelect} from './hook';
import {SelectContextProps, SelectProps} from './types';

export const SelectContext = createContext<SelectContextProps>({} as never);

export const Select = forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
  const {inputProps, context, dropdownProps} = useSelect(props, ref);

  const List = context.components?.list || SelectList;

  return (
    <SelectContext.Provider value={context}>
      <Input {...inputProps} />

      <Dropdown {...dropdownProps}>
        <List />
      </Dropdown>
    </SelectContext.Provider>
  );
});
