import styled from '@emotion/styled';

import {CheckboxTree, CheckboxTreeProps} from 'checkboxTree';

import {SelectItemsProps} from '../SelectItems';
import {SelectOption} from '../types';
import {theme} from 'theme';

const Container = styled.div`
  flex-grow: 1;

  label {
    :hover {
      background-color: ${theme.colors.grey[10]};
      cursor: pointer;
    }
  }
`;

export const SelectMultipleItems: React.FC<SelectItemsProps> = props => {
  const onChange: CheckboxTreeProps['onChange'] = (newValues, target, e) => {
    return props.onChange(newValues, target as SelectOption, e);
  };

  const treeProps = {
    ...props,
    onChange,
  };

  return (
    <Container>
      <CheckboxTree {...treeProps} />
    </Container>
  );
};
