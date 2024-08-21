import {forwardRef, useRef} from 'react';
import styled from '@emotion/styled';

import {Icon} from './Icon';
import {Label} from './Label';
import {CheckboxProps, CheckboxStyles} from './types';

const Container = styled.label<CheckboxStyles>`
  position: relative;
  display: block;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const Input = styled.input<CheckboxStyles>`
  position: absolute;
  visibility: hidden;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  padding: 0;
`;

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>((props, ref) => {
  const {startAdornment, children, label, error, checked, readOnly, hasLabel, qa = 'checkbox', ...rest} = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const styles: CheckboxStyles = {
    checked,
    readOnly,
    error,

    disabled: props.disabled,

    hasLabel: hasLabel ?? (!!label || !!children),
  };

  const inputProps = {
    ref: inputRef,

    ...rest,

    type: 'checkbox',
    checked: checked === true,

    onChange: readOnly ? undefined : props.onChange,
  };

  const iconProps = {
    inputRef,
    ...styles,
  };

  const labelProps = {
    ...styles,

    children,
    label,
  };

  return (
    <Container ref={ref} data-qa={qa}>
      <Input {...inputProps} />
      <Content>
        {startAdornment}
        <Icon {...iconProps} />
        <Label {...labelProps} />
      </Content>
    </Container>
  );
});
