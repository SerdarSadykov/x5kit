import {ChangeEventHandler, useCallback} from 'react';
import styled from '@emotion/styled';
import {ListProps, VariableSizeList, VariableSizeListProps} from 'react-window';

import {theme} from 'theme';
import {Checkbox} from 'checkbox';
import {CheckboxTree, CheckboxTreeProps} from 'checkboxTree';

import {SelectOption, SelectItemsProps, SelectInternalValue, SelectState} from '../types';

const Container = styled.div`
  padding: 8px 0;

  ${theme.scroll}

  * {
    ${theme.scroll}
  }

  label {
    :hover {
      background-color: ${theme.colors.grey[10]};
      cursor: pointer;
    }
  }
`;

const CheckboxContainer = styled.div`
  label {
    padding: 6px 12px;
    padding-left: 12px;
  }
`;

const getValues = (option: SelectOption): SelectInternalValue => {
  return option.childs ? [option.value, ...option.childs.flatMap(getValues)] : [option.value];
};

const VirtualizedItem: ListProps<SelectItemsProps>['children'] = ({data, index, style}) => {
  const option = data.options[index];
  const value = data.value;
  const checked = value.includes(option.value);

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    const newValues = checked ? value.filter(value => value !== option.value) : [...value, option.value];

    data.onChange(newValues, option, e);
  };

  const optionProps = {...option, checked, onChange, key: option.value};

  return (
    <CheckboxContainer style={style}>
      <Checkbox {...optionProps} />
    </CheckboxContainer>
  );
};

const Virtualized: React.FC<SelectItemsProps> = props => {
  const {clientWidth, height, maxHeight} = props;

  const options = props.sort ? props.options.sort(props.sort) : props.options;

  const itemSize: VariableSizeListProps['itemSize'] = index => {
    if (!clientWidth) {
      return 32;
    }

    const labelLength = options[index].label.length + 12;

    return 20 * Math.ceil((8.625 * labelLength) / (clientWidth - 24)) + 12;
  };

  const listProps: VariableSizeListProps = {
    itemSize,

    itemData: props,
    itemCount: options.length,
    children: VirtualizedItem,
    height: height ?? maxHeight,
    width: '100%',
  };

  const containerProps = {height, maxHeight};

  return (
    <Container {...containerProps}>
      <VariableSizeList {...listProps} />
    </Container>
  );
};

export const SelectItemsMultiple: React.FC<SelectItemsProps> = props => {
  if (props.virtualize) {
    const hasPropsWithChilds = props.options.findIndex(option => !!option.childs?.length) !== -1;
    if (!hasPropsWithChilds) {
      return <Virtualized {...props} />;
    }
  }

  const onChange = useCallback<CheckboxTreeProps['onChange']>(
    (newValues, target, e) => props.onChange(newValues, target as SelectOption, e),
    [props.onChange]
  );

  const opened = props.state === SelectState.filtred ? props.options.flatMap(getValues) : undefined;
  const options = props.sort ? props.options.sort(props.sort) : props.options;

  const treeProps = {
    options,
    opened,
    onChange,
    value: props.value,
  };

  const containerProps = {height: props.height, maxHeight: props.maxHeight};

  return (
    <Container {...containerProps}>
      <CheckboxTree {...treeProps} />
    </Container>
  );
};
