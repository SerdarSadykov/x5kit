import {forwardRef, useState} from 'react';
import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import {InputCaption} from './InputCaption';
import {EndAdornment} from './EndAdornment';

import {InputComponent} from './InputComponent';

import type {FocusEventHandler} from 'react';
import type {InputInternalProps, InputProps, InputStyles} from './types';

const Container = styled.div<Pick<InputInternalProps, 'width'>>`
  width: ${props => props.width || '100%'};

  * {
    ${theme.typography.base}
  }
`;

export const InputContainer = styled.div<InputStyles>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  padding: 0 12px;
  overflow: hidden;
  box-sizing: border-box;

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

  :hover::after {
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

  ::after {
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

export const useInput = (props: InputProps): InputInternalProps => {
  const [focused, setFocused] = useState<boolean>(false);

  const onFocus: FocusEventHandler<HTMLInputElement> = e => {
    setFocused(!props.readOnly);
    props.onFocus?.(e);
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = e => {
    setFocused(false);
    props.onBlur?.(e);
  };

  return {
    ...props,

    style: {
      isDisabled: props.disabled,
      isReadOnly: props.readOnly,
      isUnborder: props.unborder,
      isOverflowTooltip: props.overflowTooltip,
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

      name: props.name,
      value: props.value ?? '',
      type: props.type,
      disabled: props.disabled,
      readOnly: props.readOnly,
      required: props.required,
      autoFocus: props.autoFocus,
      autoComplete: props.autoComplete,
      onClick: props.onClick,
      onInput: props.onInput,
      onChange: props.onChange,
      tabIndex: props.tabIndex,

      onFocus,
      onBlur,
    },
  };
};

export const Input = forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  const inputProps = useInput(props);
  const {startAdornment, width, style, containerRef} = inputProps;

  const Component = props.inputComponent ?? InputComponent;

  return (
    <Container ref={ref} width={width}>
      <InputContainer ref={containerRef} {...style}>
        {startAdornment}

        <Component {...inputProps} />

        <EndAdornment {...inputProps} />
      </InputContainer>

      <InputCaption {...inputProps} />
    </Container>
  );
});
