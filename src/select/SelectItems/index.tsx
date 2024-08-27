import {memo} from 'react';
import styled from '@emotion/styled';
import {ListProps, VariableSizeList, VariableSizeListProps} from 'react-window';

import {theme} from 'theme';

import {SelectItemsMultiple} from '../SelectItemsMultiple';
import {getItem} from './SelectItem';
import {SelectItemsProps} from '../types';

const Container = styled.div<Pick<SelectItemsProps, 'height' | 'maxHeight'>>`
  padding: 8px 0;

  ${theme.scroll}

  ${props => ({height: props.height, maxHeight: props.maxHeight})}

  mark {
    color: ${theme.colors.accent[80]};
    background-color: transparent;
  }
`;

const Virtualized: React.FC<SelectItemsProps> = props => {
  if (props.multiple) {
    return <SelectItemsMultiple {...props} />;
  }

  const {clientWidth, height, maxHeight} = props;

  const options = props.sort ? props.options.sort(props.sort) : props.options;

  const itemSize: VariableSizeListProps['itemSize'] = index => {
    if (!clientWidth) {
      return 32;
    }

    const labelLength = props.options[index].label.length + 12;

    return 20 * Math.ceil((8.625 * labelLength) / clientWidth) + 12;
  };

  const Item: ListProps<SelectItemsProps>['children'] = ({index, style}) => {
    const child = getItem(options[index], props);

    return <div style={style}>{child}</div>;
  };

  const listProps: VariableSizeListProps = {
    itemSize,

    children: Item,
    itemCount: options.length,
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

export const SelectItems = memo<SelectItemsProps>(props => {
  if (props.multiple) {
    return <SelectItemsMultiple {...props} />;
  }

  if (props.virtualize) {
    return <Virtualized {...props} />;
  }

  const options = props.sort ? props.options.sort(props.sort) : props.options;

  const child = options.map(option => getItem(option, props));

  const containerProps = {height: props.height, maxHeight: props.maxHeight};

  return <Container {...containerProps}>{child}</Container>;
});
