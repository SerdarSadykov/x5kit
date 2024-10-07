import {useContext, useEffect, useRef} from 'react';
import styled from '@emotion/styled';

import {Label, FieldComponent} from 'Input';
import {SelectContext} from 'Select/Select';

import type {InputProps} from 'Input';
import type {SelectProps} from 'Select/types';

const Container = styled.div<Pick<SelectProps, 'isOpen'>>`
  position: relative;
  flex-grow: 1;
  height: 100%;

  input:read-only {
    cursor: default;
  }

  input {
    ${props => ({display: props.isOpen ? undefined : 'none'})}
  }

  input + div {
    ${props => ({display: props.isOpen ? 'none' : ''})}
  }
`;

const DivFieldComponent = styled(FieldComponent)`
  padding-top: 19px;
`;

export const WrapInput: InputProps['inputComponent'] = props => {
  const divProps = {
    ...props.style,
    ...props.inputProps,

    children: props.value,
    onFocus: props.onFocus,

    onBlur: undefined,
    tabIndex: 0,
  };

  return (
    <Container>
      <Label {...props} />
      <DivFieldComponent as="div" {...divProps} />
    </Container>
  );
};

export const WrapInputEditable: InputProps['inputComponent'] = props => {
  const {isOpen} = useContext(SelectContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const inputProps = {
    ...props.style,
    ...props.inputProps,

    onFocus: undefined,
  };

  const divProps = {
    ...props.style,
    ...props.inputProps,

    children: props.value,
    onFocus: props.onFocus,

    onBlur: undefined,
    tabIndex: isOpen ? undefined : 0,
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setTimeout(() => {
      inputRef.current?.focus();
    });
  }, [isOpen]);

  return (
    <Container isOpen={isOpen}>
      <Label {...props} />
      <FieldComponent ref={inputRef} {...inputProps} />
      <DivFieldComponent as="div" {...divProps} />
    </Container>
  );
};
