import {ChangeEventHandler, useCallback, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import {ListProps, VariableSizeList, VariableSizeListProps} from 'react-window';

import {theme} from 'theme';
import {Checkbox} from 'checkbox';
import {CheckboxTree, CheckboxTreeProps} from 'checkboxTree';
import {SelectOption, SelectItemsProps, SelectState} from 'select/types';

import {getItemSize, getValues} from '../utils';

const Container = styled.div<Pick<SelectItemsProps, 'height' | 'maxHeight' | 'whiteSpace'>>`
  padding: 8px 0;
  overflow: auto;
  text-overflow: ellipsis;

  ${theme.scroll}

  ${props => ({height: props.height, maxHeight: props.maxHeight, whiteSpace: props.whiteSpace})}

  * {
    ${theme.scroll}
  }

  label {
    padding: 6px 12px;
    padding-left: 12px;

    :hover {
      background-color: ${theme.colors.grey[10]};
      cursor: pointer;
    }
  }
`;

const VirtualizedItem: ListProps<SelectItemsProps>['children'] = ({data, index, style}) => {
  const option = data.options[index];
  const value = data.value;
  const checked = value.includes(option.value);

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    const newValues = checked ? value.filter(value => value !== option.value) : [...value, option.value];

    data.onChange(newValues, option, e);
  };

  const optionProps = {...option, checked, onChange};

  return (
    <div style={style}>
      <Checkbox {...optionProps} />
    </div>
  );
};

const Virtualized: React.FC<SelectItemsProps> = props => {
  const ref = useRef<VariableSizeList>(null);

  const {options, height, maxHeight} = props;

  const itemSize = typeof props.virtualize === 'object' ? props.virtualize.itemSize : getItemSize(props);

  const listProps = {
    itemSize,
    ref,

    itemData: props,
    itemCount: options.length,
    children: VirtualizedItem,
    height: height ?? maxHeight,
    width: '100%',
  } as VariableSizeListProps;

  const containerProps = {height, maxHeight};

  useEffect(() => {
    ref.current?.resetAfterIndex(0);
  }, [options]);

  return (
    <Container {...containerProps}>
      <VariableSizeList {...listProps} />
    </Container>
  );
};

export const SelectItemsMultiple: React.FC<SelectItemsProps> = props => {
  if (props.virtualize) {
    const isTree = props.options.findIndex(option => !!option.childs?.length) !== -1;
    if (!isTree) {
      return <Virtualized {...props} />;
    }
  }

  const onChange = useCallback<CheckboxTreeProps['onChange']>(
    (newValues, target, e) => props.onChange(newValues, target as SelectOption, e),
    [props.onChange]
  );

  const opened = props.state === SelectState.filtred ? props.options.flatMap(getValues) : undefined;

  const treeProps = {
    opened,
    onChange,
    options: props.options,
    value: props.value,
  };

  const containerProps = {height: props.height, maxHeight: props.maxHeight};

  return (
    <Container {...containerProps}>
      <CheckboxTree {...treeProps} />
    </Container>
  );
};
