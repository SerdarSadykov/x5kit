import React, {memo} from 'react';
import styled from '@emotion/styled';
import {ListChildComponentProps} from 'react-window';

import {Placement, theme} from 'theme';

import {CheckboxProps} from 'checkbox';
import {SelectItemProps, SelectItemsProps} from 'select/types';
import {Tooltip} from 'tooltip';

const Container = styled.label<Pick<CheckboxProps, 'checked' | 'disabled'>>`
  position: relative;
  display: block;
  padding: 6px 12px;
  word-wrap: break-word;
  box-sizing: border-box;
  user-select: none;

  ${theme.typography.p1compact};

  :hover {
    ${props => {
      if (props.disabled) {
        return;
      }

      return {
        backgroundColor: theme.colors.grey[10],
        color: theme.colors.grey[100],
        cursor: 'pointer',
      };
    }}
  }

  ${props => {
    if (props.checked) {
      return {
        color: theme.colors.white,
        backgroundColor: theme.colors.accent[90],
      };
    }

    if (props.disabled) {
      return {
        color: theme.colors.grey[40],
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
    option: {name, label, value, disabled, children, tooltip},
  } = props;

  const onChange: CheckboxProps['onChange'] = e => {
    if (disabled) {
      return;
    }

    props.onChange([option.value], option, e);
    props.setIsOpen(false);
  };

  const containerProps = {style, checked, disabled};

  const inputProps = {name, value, checked, onChange, type: 'radio'};

  const child = (
    <Container {...containerProps}>
      <input {...inputProps} />
      {children ?? label}
    </Container>
  );

  if (!tooltip) {
    return child;
  }

  return (
    <Tooltip placement={Placement.right} content={tooltip}>
      {child}
    </Tooltip>
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
