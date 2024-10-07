import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';
import {Done, Remove} from 'icons';

import type {KeyboardEventHandler, ReactNode, RefObject} from 'react';

import type {CheckboxStyles} from '../types';

const Container = styled.div<CheckboxStyles>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  color: ${theme.colors.white};
  border: 1px solid ${theme.colors.grey[30]};
  cursor: pointer;

  :focus-visible::after {
    content: '';
    display: block;
    position: absolute;
    box-sizing: border-box;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    border-radius: 4px;
    box-shadow: 0px 0px 3px 2px ${theme.colors.accent[70]};
  }

  ${({hasLabel, checked, error, readOnly, disabled}) => {
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
      if (checked) {
        return {
          ...styles,
          backgroundColor: theme.colors.accent[20],
          borderColor: theme.colors.accent[20],
          cursor: 'default',
        };
      }

      return {
        ...styles,
        backgroundColor: 'transparent',
        borderColor: theme.colors.grey[20],
        cursor: 'default',
      };
    }

    if (checked) {
      return {
        ...styles,
        backgroundColor: theme.colors.accent[90],
        borderColor: theme.colors.accent[90],

        ':hover': {
          backgroundColor: theme.colors.accent[80],
        },
      };
    }

    return styles;
  }}
`;

export const Icon: React.FC<CheckboxStyles & {inputRef: RefObject<HTMLInputElement>}> = ({inputRef, ...props}) => {
  let children: ReactNode = null;

  switch (props.checked) {
    case 'halfOn':
      children = <Remove size={SizeTokenValue.XSmall} />;
      break;

    case true:
      children = <Done size={SizeTokenValue.XSmall} />;
      break;
  }

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      inputRef.current?.click();
    }
  };

  const containerProps = {
    tabIndex: props.disabled || props.readOnly ? undefined : 0,

    ...props,

    children,
    onKeyDown,
  };

  return <Container {...containerProps} />;
};
