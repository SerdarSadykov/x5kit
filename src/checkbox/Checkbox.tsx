import {forwardRef, useRef} from 'react';
import styled from '@emotion/styled';

import {Icon} from './Icon';
import {Label} from './Label';
import {CheckboxProps, CheckboxStyles} from './types';

const Container = styled.label`
  position: relative;
  display: block;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const Input = styled.input`
  position: absolute;
  visibility: hidden;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  padding: 0;
`;

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>((props, ref) => {
  const {
    startAdornment,
    children,
    label,
    error,
    checked,
    disabled,
    readOnly,
    hasLabel,
    whiteSpace,
    qa = 'checkbox',
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const styles: CheckboxStyles = {
    checked,
    readOnly,
    error,
    disabled,
    whiteSpace,

    hasLabel: hasLabel ?? (!!label || !!children),
  };

  const inputProps = {
    ...rest,

    readOnly,
    error,
    disabled,
    type: 'checkbox',
    checked: checked === true,

    onChange: !readOnly && !disabled ? props.onChange : undefined,
  };

  const containerProps = {
    readOnly,
    error,
    disabled,

    'data-qa': qa,
  };

  const iconProps = {...styles, inputRef};

  const labelProps = {
    ...styles,

    children,
    label,
  };

  return (
    <Container ref={ref} {...containerProps}>
      <Input ref={inputRef} {...inputProps} />
      <Content>
        {startAdornment}
        <Icon {...iconProps} />
        <Label {...labelProps} />
      </Content>
    </Container>
  );
});
