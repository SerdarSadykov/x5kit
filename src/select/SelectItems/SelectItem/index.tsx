import {memo} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import {CheckboxProps} from 'checkbox';
import {SelectItemProps, SelectItemsProps, SelectOption} from 'select/types';

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
    checked,
    option,
    option: {name, label, value},
  } = props;

  const onChange: CheckboxProps['onChange'] = e => {
    props.onChange([option.value], option, e);
    props.setIsOpen(false);
  };

  const inputProps = {name, value, checked, onChange, type: 'radio'};

  return (
    <Container>
      <input {...inputProps} />
      {label}
    </Container>
  );
});

export const getItem = (option: SelectOption, props: SelectItemsProps) => (
  <SelectItem
    key={option.value}
    option={option}
    checked={props.value.includes(option.value)}
    onChange={props.onChange}
    setIsOpen={props.setIsOpen}
  />
);
