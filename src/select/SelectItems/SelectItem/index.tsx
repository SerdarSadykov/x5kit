import React, {memo} from 'react';
import styled from '@emotion/styled';
import {ListChildComponentProps} from 'react-window';

import {theme} from 'theme';

import {CheckboxProps} from 'checkbox';
import {SelectItemProps, SelectItemsProps} from 'select/types';

const Container = styled.label<Pick<CheckboxProps, 'checked'>>`
  position: relative;
  display: block;
  padding: 6px 12px;
  word-wrap: break-word;
  box-sizing: border-box;
  user-select: none;

  ${theme.typography.p1compact};

  :hover {
    background-color: ${theme.colors.grey[10]};
    color: ${theme.colors.grey[100]};
    cursor: pointer;
  }

  ${props => {
    if (props.checked) {
      return {
        color: theme.colors.white,
        backgroundColor: theme.colors.accent[90],
      };
    }
  }}

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
    <Container style={style} checked={checked}>
      <input {...inputProps} />
      {children ?? label}
    </Container>
  );
});

type ItemProps = Omit<ListChildComponentProps<SelectItemsProps>, 'style'> & Pick<SelectItemProps, 'style'>;

export const Item: React.FC<ItemProps> = ({data, index, style}) => {
  const option = data.options[index];
  const Component = data.item ?? SelectItem;

  return (
    <Component
      key={option.value}
      option={option}
      style={style}
      checked={data.value.includes(option.value)}
      onChange={data.onChange}
      setIsOpen={data.setIsOpen}
    />
  );
};
