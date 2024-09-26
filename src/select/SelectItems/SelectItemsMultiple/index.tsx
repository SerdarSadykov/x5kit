import {ChangeEventHandler, UIEventHandler, useCallback, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import {ListProps, VariableSizeList, VariableSizeListProps} from 'react-window';

import {theme} from 'theme';
import {Checkbox} from 'checkbox';
import {CheckboxTree, CheckboxTreeProps} from 'checkboxTree';
import {SelectOption, SelectItemsProps, SelectState} from 'select/types';

import {getItemSize, getValues} from '../utils';

const BaseContainer = styled.div<Pick<SelectItemsProps, 'height' | 'maxHeight' | 'whiteSpace'>>`
  label {
    display: block;
    padding: 6px 12px;
    padding-left: 12px;

    :hover {
      background-color: ${theme.colors.grey[10]};
      cursor: pointer;
    }
  }
`;

const Container = styled(BaseContainer)`
  padding: 8px 0;
  overflow: auto;
  text-overflow: ellipsis;

  ${theme.scroll}

  ${props => ({height: props.height, maxHeight: props.maxHeight, whiteSpace: props.whiteSpace})}
`;

const VirtualizedContainer = styled(BaseContainer)`
  padding: 8px 0;

  > div {
    overflow: auto;
    text-overflow: ellipsis;

    ${theme.scroll}

    ${props => ({height: props.height, maxHeight: props.maxHeight, whiteSpace: props.whiteSpace})}
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
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<VariableSizeList>(null);

  const {options, height, maxHeight} = props;

  const itemSize = typeof props.virtualize === 'object' ? props.virtualize.itemSize : getItemSize(props);

  const onScroll = () => {
    props.loadMore(containerRef.current?.children?.[0] as HTMLDivElement);
  };

  const containerProps = {
    height,
    maxHeight,
    whiteSpace: props.whiteSpace,
  };

  const listProps = {
    itemSize,
    onScroll,

    itemData: props,
    itemCount: options.length,
    children: VirtualizedItem,
    height: height ?? maxHeight,
    width: '100%',
  } as VariableSizeListProps;

  useEffect(() => {
    ref.current?.resetAfterIndex(0);
  }, [options]);

  return (
    <VirtualizedContainer ref={containerRef} {...containerProps}>
      <VariableSizeList ref={ref} {...listProps} />
    </VirtualizedContainer>
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

  const onScroll: UIEventHandler<HTMLDivElement> = e => {
    props.loadMore(e.target as HTMLDivElement);
  };

  const opened = props.state === SelectState.filtred ? props.options.flatMap(getValues) : undefined;

  const containerProps = {
    onScroll,
    height: props.height,
    maxHeight: props.maxHeight,
    whiteSpace: props.whiteSpace,
  };

  const treeProps = {
    opened,
    onChange,
    options: props.options,
    value: props.value,
  };

  return (
    <Container {...containerProps}>
      <CheckboxTree {...treeProps} />
    </Container>
  );
};
