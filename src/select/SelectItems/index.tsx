import {memo, UIEventHandler, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import {VariableSizeList, VariableSizeListProps} from 'react-window';

import {theme} from 'theme';

import {SelectItemsProps} from '../types';

import {SelectItemsMultiple} from './SelectItemsMultiple';
import {Item} from './SelectItem';
import {getItemSize} from './utils';

const BaseContainer = styled.div<Pick<SelectItemsProps, 'height' | 'maxHeight' | 'whiteSpace'>>`
  mark {
    color: ${theme.colors.accent[80]};
    background-color: transparent;
  }
`;

const Container = styled(BaseContainer)`
  padding: 8px 0;
  overflow: auto;

  ${theme.scroll}

  ${props => ({height: props.height, maxHeight: props.maxHeight, whiteSpace: props.whiteSpace})}
`;

const VirtualizedContainer = styled(BaseContainer)`
  padding: 8px 0;

  > div {
    overflow: auto;

    ${theme.scroll}

    ${props => ({height: props.height, maxHeight: props.maxHeight, whiteSpace: props.whiteSpace})}
  }
`;

const Virtualized: React.FC<SelectItemsProps> = props => {
  const {options, height, maxHeight, whiteSpace, virtualize} = props;

  const ref = useRef<VariableSizeList>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemSize = typeof virtualize === 'object' ? virtualize.itemSize : getItemSize(props);

  const onScroll = () => {
    props.loadMore(containerRef.current?.children?.[0] as HTMLDivElement);
  };

  const containerProps = {height, maxHeight, whiteSpace};

  const listProps = {
    itemSize,
    onScroll,

    width: '100%',
    height: height ?? maxHeight,
    itemCount: options.length,
    itemData: props,
    children: Item,
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

export const SelectItems = memo<SelectItemsProps>(props => {
  if (props.multiple && !props.item) {
    return <SelectItemsMultiple {...props} />;
  }

  if (props.virtualize) {
    return <Virtualized {...props} />;
  }

  const onScroll: UIEventHandler<HTMLDivElement> = e => {
    props.loadMore(e.target as HTMLDivElement);
  };

  const child = props.options.map((option, index) => <Item key={option.value} index={index} data={props} />);

  const containerProps = {
    onScroll,

    height: props.height,
    maxHeight: props.maxHeight,
    whiteSpace: props.whiteSpace,
  };

  return <Container {...containerProps}>{child}</Container>;
});
