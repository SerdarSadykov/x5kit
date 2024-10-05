import {useRef} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import type {HTMLAttributes, KeyboardEventHandler} from 'react';

import type {RadioStyles} from '../types';

const Container = styled.div<RadioStyles>`
  position: relative;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  color: ${theme.colors.white};
  border: 1px solid ${theme.colors.grey[30]};
  cursor: pointer;

  :focus-visible::before {
    content: '';
    display: block;
    position: absolute;
    box-sizing: border-box;
    top: -1px;
    left: -1px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    box-shadow: 0px 0px 3px 2px ${theme.colors.accent[70]};
  }

  ::after {
    content: '';
    display: block;
    position: absolute;
    box-sizing: border-box;
    top: 4px;
    left: 4px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  ${({error, readOnly, disabled, hasLabel}) => {
    const styles = {
      margin: hasLabel ? '2px 0 0' : undefined,
    };

    if (error) {
      return {
        ...styles,
        borderColor: theme.colors.red[80],
        color: theme.colors.red[80],
        cursor: readOnly || disabled ? 'default' : 'pointer',
      };
    }

    if (readOnly) {
      return {
        ...styles,
        backgroundColor: 'transparent',
        borderStyle: 'dashed',
        borderColor: theme.colors.grey[30],
        color: theme.colors.grey[80],
        cursor: 'default',
      };
    }

    if (disabled) {
      return {
        ...styles,
        backgroundColor: 'transparent',
        borderColor: theme.colors.grey[20],
        cursor: 'default',
      };
    }

    return styles;
  }}
`;

const Input = styled.input<RadioStyles>`
  position: absolute;
  visibility: hidden;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  padding: 0;

  :checked + div::after {
    background-color: ${({error, readOnly}) => {
      if (error) {
        return theme.colors.red[80];
      }

      if (readOnly) {
        return theme.colors.grey[80];
      }

      return theme.colors.white;
    }};
  }

  :checked + div {
    ${({error, disabled, readOnly}) => {
      if (error) {
        return {
          backgroundColor: 'transparent',
        };
      }

      if (readOnly) {
        return {
          backgroundColor: 'transparent',
          borderColor: theme.colors.accent[20],
          cursor: 'default',
        };
      }

      if (disabled) {
        return {
          backgroundColor: theme.colors.accent[20],
          borderColor: theme.colors.accent[20],
          cursor: 'default',
        };
      }

      return {
        backgroundColor: theme.colors.accent[90],
        borderColor: theme.colors.accent[90],

        ':hover': {
          backgroundColor: theme.colors.accent[80],
        },
      };
    }}
  }
`;

export const Icon: React.FC<RadioStyles & {inputProps: HTMLAttributes<HTMLInputElement>}> = props => {
  const {disabled, readOnly, error, hasLabel, inputProps} = props;
  const isEnabled = !disabled && !readOnly;

  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      inputRef.current?.click();
    }

    inputProps.onKeyDown?.(e);
  };

  const containerProps = {
    tabIndex: isEnabled ? 0 : undefined,

    readOnly,
    error,
    disabled,
    hasLabel,

    onKeyDown,
  };

  const resultProps = {
    ...inputProps,

    readOnly,
    error,
    disabled,

    type: 'radio',
    onChange: isEnabled ? inputProps.onChange : undefined,
  };

  return (
    <>
      <Input ref={inputRef} {...resultProps} />
      <Container {...containerProps} />
    </>
  );
};
