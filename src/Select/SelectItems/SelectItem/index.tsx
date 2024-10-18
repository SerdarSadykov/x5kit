import {memo} from 'react';
import styled from '@emotion/styled';

import {Placement, theme} from 'theme';

import {Tooltip} from 'Tooltip';

import type {ListChildComponentProps} from 'react-window';

import type {CheckboxProps} from 'Checkbox';
import type {SelectItemProps, SelectItemsProps} from 'Select/types';

const Container = styled.label<Pick<CheckboxProps, 'checked' | 'disabled'>>`
  position: relative;
  display: flex;
  gap: 8px;
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
    name,
    style,
    checked,
    option,
    option: {label, icon, value, disabled, children, tooltip},
  } = props;

  const onChange: CheckboxProps['onChange'] = e => {
    if (disabled) {
      return;
    }

    props.onChange([option.value], option, e);
    props.setIsOpen(false);
  };

  const containerProps = {style, checked, disabled};

  const inputProps = {
    value,
    checked,
    onChange,

    type: 'radio',
    name: name ? `${name}-option` : undefined,
  };

  const child = (
    <Container {...containerProps}>
      <input {...inputProps} />
      {icon}
      <div>{children ?? label}</div>
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
      name={data.name}
      checked={data.value.includes(option.value)}
      onChange={data.onChange}
      setIsOpen={data.setIsOpen}
    />
  );
};
