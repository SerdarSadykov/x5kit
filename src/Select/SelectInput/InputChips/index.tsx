import {useContext} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import {Label, FieldComponent as BaseFieldComponent} from 'Input';
import {SelectContext} from 'Select/Select';

import {Chips} from './Chips';

import type {InputProps} from 'Input';

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;

  input:read-only {
    cursor: default;
  }
`;

const FieldComponent = styled(BaseFieldComponent)`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  padding: ${props => (props.isFilled && props.isLabeled && !props.isSmall ? '20px 0 4px' : 0)};
`;

const InputComponent = styled.input`
  width: 0;
  min-width: 30px;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: ${props => (props.readOnly ? 'default' : undefined)};

  ${theme.typography.p1}
`;

export const InputChips: InputProps['inputComponent'] = props => {
  const isReadOnly = !useContext(SelectContext).filter;

  const componentProps = {...props.style, isReadOnly};

  const inputProps = {
    ...props.style,
    ...props.inputProps,

    readOnly: isReadOnly,
  };

  return (
    <Container>
      <Label {...props} />
      <FieldComponent as="div" {...componentProps}>
        <Chips />
        <InputComponent {...inputProps} />
      </FieldComponent>
    </Container>
  );
};
