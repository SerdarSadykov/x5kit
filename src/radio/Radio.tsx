import {forwardRef} from 'react';
import styled from '@emotion/styled';

import {Icon} from './Icon';
import {Label} from './Label';
import {RadioProps, RadioStyles} from './types';

const Container = styled.label`
  position: relative;
  display: block;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const Radio = forwardRef<HTMLLabelElement, RadioProps>((props, ref) => {
  const {
    startAdornment,
    children,
    label,
    error,
    disabled,
    readOnly,
    hasLabel,
    whiteSpace,
    qa = 'radio',

    ...rest
  } = props;

  const styles: RadioStyles = {
    readOnly,
    error,
    disabled,
    whiteSpace,

    hasLabel: hasLabel ?? (!!label || !!children),
  };

  const containerProps = {
    readOnly,
    error,
    disabled,

    'data-qa': qa,
  };

  const labelProps = {
    ...styles,

    children,
    label,
  };

  return (
    <Container ref={ref} {...containerProps}>
      <Content>
        {startAdornment}
        <Icon {...styles} inputProps={rest} />
        <Label {...labelProps} />
      </Content>
    </Container>
  );
});
