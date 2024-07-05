import {FocusEventHandler, InputHTMLAttributes, forwardRef, useState} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import {Caption} from './Caption';
import {EndAdornment} from './EndAdornment';
import {Field, MaskedField} from './Field';
import {Label} from './Label';

import {InputInternalProps, InputProps, InputStyles, MaskedInputProps} from './types';

const Container = styled.div<InputHTMLAttributes<HTMLInputElement>>`
  width: ${props => props.width || '100%'};

  * {
    font-family: ${theme.typography.base.fontFamily};
  }
`;

const InputContainer = styled.div<InputStyles>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  overflow: hidden;

  ${({disabled}) => {
    if (disabled) {
      return {
        color: theme.colors.grey[40],
      };
    }

    return {
      color: theme.colors.grey[60],
    };
  }}

  &:hover::after {
    ${({disabled, focused}) => {
      if (disabled || focused) {
        return;
      }

      return {
        borderWidth: 2,
        borderColor: theme.colors.grey[40],
      };
    }}
  }

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

    ${({error, disabled, focused, unborder}) => {
      if (error) {
        return {
          borderWidth: 2,
          borderColor: theme.colors.additional.red[80],
        };
      }

      if (disabled) {
        return {
          borderWidth: 1,
          borderColor: theme.colors.grey[20],
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

const Inner = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;
`;

const useInput = (props: InputProps | MaskedInputProps): InputInternalProps => {
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
    filled: props.filled ?? !!props.value,
    focused: props.focused ?? focused,

    size: props.size,

    disabled: props.disabled,
    unborder: props.unborder,
    loading: props.loading,

    error: props.error,
  };

  return {
    ...props,

    onFocus,
    onBlur,
    styles,
  };
};

export const Input = forwardRef<HTMLDivElement, InputProps | MaskedInputProps>((props, ref) => {
  const inputProps = useInput(props);

  const component = 'mask' in inputProps ? <MaskedField {...inputProps} /> : <Field {...inputProps} />;

  return (
    <Container ref={ref} width={props.width}>
      <InputContainer {...inputProps.styles}>
        {props.startAdornment}

        <Inner>
          {component}
          <Label {...inputProps} />
        </Inner>

        <EndAdornment {...inputProps} />
      </InputContainer>

      <Caption {...inputProps} />
    </Container>
  );
});
