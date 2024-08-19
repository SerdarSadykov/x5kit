import styled from '@emotion/styled';

import {CheckboxTree, CheckboxTreeProps} from 'checkboxTree';

import {SelectItemsProps} from '../SelectItems';
import {SelectOption} from '../types';

const Container = styled.div``;

export const SelectMultipleItems: React.FC<SelectItemsProps> = props => {
  const onChange: CheckboxTreeProps['onChange'] = (newValues, target, e) => {
    return props.onChange(newValues, target as SelectOption, e);
  };

  const treeProps = {
    onChange,
    options: props.options,
    value: props.value,
  };

  return (
    <Container>
      <CheckboxTree {...treeProps} />
    </Container>
  );
};
