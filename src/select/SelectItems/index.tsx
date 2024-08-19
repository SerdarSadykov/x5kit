import styled from '@emotion/styled';

import {RequiredQA} from 'common';

import {SelectMultipleItems} from '../SelectMultipleItems';
import {SelectOption, SelectProps} from '../types';

const Container = styled.div``;

const ListItem = styled.div`
  position: relative;
`;

export type SelectItemsProps = {
  options: SelectOption[];
} & RequiredQA & Pick<SelectProps, 'value' | 'onChange' | 'multiple'>;

export const SelectItems: React.FC<SelectItemsProps> = props => {
  if (props.multiple) {
    return <SelectMultipleItems {...props} />;
  }

  const child = props.options.map(option => <ListItem key={option.value}>{option.label}</ListItem>);

  return <Container>{child}</Container>;
};
