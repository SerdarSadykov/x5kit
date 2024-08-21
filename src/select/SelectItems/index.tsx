import styled from '@emotion/styled';

import {RequiredQA} from 'common';
import {theme} from 'theme';
import {CheckboxTreeProps} from 'checkboxTree';

import {SelectMultipleItems} from '../SelectMultipleItems';
import {SelectItem} from '../SelectItem';
import {SelectOption, SelectProps} from '../types';

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
  Pick<SelectProps, 'value' | 'onChange' | 'multiple'> &
  Pick<CheckboxTreeProps, 'opened'>;

export const SelectItems: React.FC<SelectItemsProps> = props => {
  if (props.multiple) {
    return <SelectMultipleItems {...props} />;
  }

  const child = props.options.map(option => (
    <SelectItem
      key={option.value}
      option={option}
      checked={props.value.includes(option.value)}
      onChange={e => props.onChange(option.value, option, e)}
    />
  ));

  return <Container>{child}</Container>;
};
