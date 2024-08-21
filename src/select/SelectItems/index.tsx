import styled from '@emotion/styled';

import {RequiredQA} from 'common';
import {theme} from 'theme';
import {CheckboxTreeProps} from 'checkboxTree';

import {SelectItemsMultiple} from '../SelectItemsMultiple';
import {SelectItem} from '../SelectItem';
import {SelectContextProps, SelectOption, SelectProps} from '../types';
import {ChangeEventHandler, MouseEventHandler} from 'react';

const Container = styled.div`
  padding: 8px 0;
  overflow: auto;
  flex-grow: 1;

  ${theme.scroll}

  mark {
    color: ${theme.colors.accent[80]};
    background-color: transparent;
  }
`;

export type SelectItemsProps = {
  options: SelectOption[];
} & RequiredQA &
  Pick<SelectContextProps, 'value' | 'onChange' | 'multiple' | 'setIsOpen'> &
  Pick<CheckboxTreeProps, 'opened'>;

export const SelectItems: React.FC<SelectItemsProps> = props => {
  if (props.multiple) {
    return <SelectItemsMultiple {...props} />;
  }

  const onChange = (option: SelectOption): ChangeEventHandler<HTMLInputElement> => {
    return e => {
      props.onChange([option.value], option, e);
      props.setIsOpen(false);
    };
  };

  const child = props.options.map(option => (
    <SelectItem
      key={option.value}
      option={option}
      checked={props.value.includes(option.value)}
      onChange={onChange(option)}
    />
  ));

  return <Container>{child}</Container>;
};
