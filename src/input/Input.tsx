import {FocusEventHandler, forwardRef, useState} from 'react';
import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import {Caption} from './Caption';
import {EndAdornment} from './EndAdornment';
import {Field} from './Field';
import {Label} from './Label';

import {InputInternalProps, InputProps, InputStyles} from './types';

const Container = styled.div<Pick<InputInternalProps, 'width'>>`
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

  ${({isDisabled}) => {
    if (isDisabled) {
      return {
        color: theme.colors.grey[40],
      };
    }

    return {
      color: theme.colors.grey[60],
    };
  }}

  &:hover::after {
    ${({isDisabled, isFocused}) => {
      if (isDisabled || isFocused) {
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

    ${({isError, isDisabled, isFocused, isUnborder}) => {
      if (isError) {
        return {
          borderWidth: 2,
          borderColor: theme.colors.additional.red[80],
        };
      }

      if (isDisabled) {
        return {
          borderWidth: 1,
          borderColor: theme.colors.grey[20],
        };
      }

      if (isFocused) {
        return {
          borderWidth: 2,
          borderColor: theme.colors.accent[90],
        };
      }

      if (isUnborder) {
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

const useInput = (props: InputProps): InputInternalProps => {
  const [focused, setFocused] = useState<boolean>(false);

  const onFocus: FocusEventHandler<HTMLInputElement> = e => {
    setFocused(true);
    props.inputProps?.onFocus?.(e);
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = e => {
    setFocused(false);
    props.inputProps?.onBlur?.(e);
  };

  return {
    ...props,

    style: {
      isDisabled: props.disabled,
      isUnborder: props.unborder,
      isLoading: props.loading,
      isLabeled: !!props.label,
      isMasked: !!props.mask,
      isError: !!props.error,
      isAbsoluteCaption: !!props.absoluteCaption,

      isFocused: props.focused ?? focused,
      isFilled: props.filled ?? !!props.value,
      isSmall: props.size === SizeTokenValue.Small,
    },

    inputProps: {
      ...props.inputProps,

      disabled: props.disabled,
      readOnly: props.readOnly,
      required: props.required,
      autoFocus: props.autoFocus,
      autoComplete: props.autoComplete,

      onFocus,
      onBlur,
    },
  };
};

export const Input = forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  const inputProps = useInput(props);
  const {startAdornment, width, style} = inputProps;

  return (
    <Container ref={ref} width={width}>
      <InputContainer {...style}>
        {startAdornment}

        <Inner>
          <Field {...inputProps} />
          <Label {...inputProps} />
        </Inner>

        <EndAdornment {...inputProps} />
      </InputContainer>

      <Caption {...inputProps} />
    </Container>
  );
});
