import styled from '@emotion/styled';

import {InputProps, Label, FieldComponent} from 'input';

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;

  input:read-only {
    cursor: default;
  }
`;

export const InputText: InputProps['inputComponent'] = props => {
  const inputProps = {
    ...props.style,
    ...props.inputProps,

    value: props.value,
    type: props.type,
    onInput: props.onChange,
  };

  return (
    <Container>
      <Label {...props} />
      <FieldComponent {...inputProps} />
    </Container>
  );
};