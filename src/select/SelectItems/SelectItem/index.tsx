import {CSSProperties, memo} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import {CheckboxProps} from 'checkbox';
import {SelectItemProps, SelectItemsProps, SelectOption} from 'select/types';
import {ListProps} from 'react-window';

const Container = styled.label`
  position: relative;
  display: block;
  padding: 6px 12px;
  word-wrap: break-word;

  ${theme.typography.p1compact};

  :hover {
    background-color: ${theme.colors.grey[10]};
    cursor: pointer;
  }

  input {
    position: absolute;
    visibility: hidden;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }
`;

const SelectItem = memo<SelectItemProps>(props => {
  const {
    style,
    checked,
    option,
    option: {name, label, value, children},
  } = props;

  const onChange: CheckboxProps['onChange'] = e => {
    props.onChange([option.value], option, e);
    props.setIsOpen(false);
  };

  const inputProps = {name, value, checked, onChange, type: 'radio'};

  return (
    <Container style={style}>
      <input {...inputProps} />
      {children ?? label}
    </Container>
  );
});

export const getItem = (option: SelectOption, props: SelectItemsProps, style?: CSSProperties) => {
  const Component = props.itemComponent ?? SelectItem;

  return (
    <Component
      key={option.value}
      option={option}
      checked={props.value.includes(option.value)}
      onChange={props.onChange}
      setIsOpen={props.setIsOpen}
      style={style}
    />
  );
};

export const getVirtualizedItem: ListProps<SelectItemsProps>['children'] = ({data, index, style}) => {
  return getItem(data.options[index], data, style);
};
