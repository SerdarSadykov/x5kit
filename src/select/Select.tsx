import {createContext, forwardRef} from 'react';

import {Dropdown} from 'dropdown';

import {SelectInput} from './SelectInput';
import {SelectList} from './SelectList';
import {useSelect} from './hook';
import {SelectContextProps, SelectProps} from './types';

export const SelectContext = createContext<SelectContextProps>({} as never);

export const Select = forwardRef<HTMLInputElement, SelectProps>((props, baseRef) => {
  const {ref, inputProps, context, dropdownProps} = useSelect(props, baseRef);

  const List = context.components?.list || SelectList;

  return (
    <SelectContext.Provider value={context}>
      <SelectInput ref={ref} {...inputProps} />

      <Dropdown {...dropdownProps}>
        <List />
      </Dropdown>
    </SelectContext.Provider>
  );
});
