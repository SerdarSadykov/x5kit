import styled from '@emotion/styled';

import {InputProps, Label, FieldComponent as BaseFieldComponent} from 'input';

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;

  input:read-only {
    cursor: default;
  }
`;

const FieldComponent = styled(BaseFieldComponent)`
  padding-top: 19px;
`;

export const InputTextNoWrap: InputProps['inputComponent'] = props => {
  const inputProps = {
    ...props.style,
    ...props.inputProps,

    value: props.value,
    type: props.type,
    onInput: props.onChange,

    readOnly: true,
    isReadOnly: true,
  };

  return (
    <Container>
      <Label {...props} />
      <FieldComponent as="div" tabIndex={0} {...inputProps}>
        {props.value}
      </FieldComponent>
    </Container>
  );
};
