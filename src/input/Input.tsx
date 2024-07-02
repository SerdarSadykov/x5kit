import {FocusEventHandler, InputHTMLAttributes, forwardRef, useState} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import {Caption} from './Caption';
import {EndAdornment} from './EndAdornment';
import {Field} from './Field';
import {InputProps, InputStyles} from './types';

const Container = styled.div<InputHTMLAttributes<HTMLInputElement>>`
  width: ${props => props.width || '100%'};
  font-family: ${theme.typography.base.fontFamily};
`;

const InputContainer = styled.div<InputStyles>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  font-size: ${theme.spaces.x8}px;
  line-height: ${theme.spaces.x12}px;
  letter-spacing: 0.12px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-sizing: border-box;
    border-style: solid;
    border-radius: 4px;
    user-select: none;
    pointer-events: none;

    ${({error, focused, unborder}) => {
      if (error) {
        return {
          borderWidth: 2,
          borderColor: theme.colors.additional.red[80],
        };
      }

      if (focused) {
        return {
          borderWidth: 2,
          borderColor: theme.colors.accent[90],
        };
      }

      if (unborder) {
        return {
          display: 'none',
        };
      }

      return {
        borderWidth: 1,
        borderColor: theme.colors.grey[30],
      };
    }}
  }
`;


export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {value, loading, startAdornment} = props;

  const [focused, setFocused] = useState<boolean>(false);

  const onFocus: FocusEventHandler<HTMLInputElement> = e => {
    setFocused(true);
    props.onFocus?.(e);
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = e => {
    setFocused(false);
    props.onBlur?.(e);
  };

  const styles: InputStyles = {
    focused,
    loading,
    error: props.error,
    unborder: props.unborder,
    filled: props.filled ?? !!value,
  };

  const inputProps = {...props, ...styles, onFocus, onBlur};

  return (
    <Container ref={ref} width={props.width}>
      <InputContainer {...styles}>
        {startAdornment}

        <Field {...inputProps} />

        <EndAdornment {...inputProps} />
      </InputContainer>
      
      <Caption {...inputProps} />
    </Container>
  );
});
