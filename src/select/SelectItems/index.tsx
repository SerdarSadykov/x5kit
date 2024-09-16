import {memo, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import {VariableSizeList, VariableSizeListProps} from 'react-window';

import {theme} from 'theme';

import {SelectItemsProps} from '../types';

import {SelectItemsMultiple} from './SelectItemsMultiple';
import {getItem, getVirtualizedItem} from './SelectItem';
import {getItemSize} from './utils';

const Container = styled.div<Pick<SelectItemsProps, 'height' | 'maxHeight' | 'whiteSpace'>>`
  padding: 8px 0;
  overflow: auto;

  ${theme.scroll}

  ${props => ({height: props.height, maxHeight: props.maxHeight, whiteSpace: props.whiteSpace})}

  mark {
    color: ${theme.colors.accent[80]};
    background-color: transparent;
  }
`;

const Virtualized: React.FC<SelectItemsProps> = props => {
  const ref = useRef<VariableSizeList>(null);
  const {options, height, maxHeight} = props;

  const itemSize = typeof props.virtualize === 'object' ? props.virtualize.itemSize : getItemSize(props);

  const listProps = {
    itemSize,
    ref,

    children: getVirtualizedItem,
    itemCount: options.length,
    height: height ?? maxHeight,
    width: '100%',
    itemData: props,
  } as VariableSizeListProps;

  const containerProps = {
    height,
    maxHeight,
    whiteSpace: props.whiteSpace,
  };

  useEffect(() => {
    ref.current?.resetAfterIndex(0);
  }, [options]);

  return (
    <Container {...containerProps}>
      <VariableSizeList {...listProps} />
    </Container>
  );
};

export const SelectItems = memo<SelectItemsProps>(props => {
  if (!props.itemComponent) {
    if (props.multiple) {
      return <SelectItemsMultiple {...props} />;
    }

    if (props.virtualize) {
      return <Virtualized {...props} />;
    }
  }

  const child = props.options.map(option => getItem(option, props));

  const containerProps = {
    height: props.height,
    maxHeight: props.maxHeight,
    whiteSpace: props.whiteSpace,
  };

  return <Container {...containerProps}>{child}</Container>;
});
