import {FocusEventHandler, forwardRef, useContext, useState} from 'react';
import styled from '@emotion/styled';

import {Input as BaseInput, InputProps, Field, Label} from 'input';
import {useInput} from './hook';

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;

  input:read-only {
    cursor: default;
  }
`;

const Component: InputProps['inputComponent'] = props => {
  return (
    <Container>
      <Label {...props} />
      <Field {...props} />
    </Container>
  );
};

export const Input = forwardRef<HTMLInputElement, Omit<InputProps, 'value' | 'onChange'>>((props, ref) => {
  const inputProps = useInput(props, ref);

  return <BaseInput {...inputProps} inputComponent={Component} />;
});
