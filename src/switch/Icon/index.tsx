import {KeyboardEventHandler, RefObject} from 'react';
import styled, {CSSObject} from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import {SwitchStyles} from '../types';

const Container = styled.div<SwitchStyles>`
  position: relative;
  flex-shrink: 0;
  color: ${theme.colors.white};
  border-radius: 10px;
  border: 1px solid transparent;
  box-sizing: border-box;
  cursor: pointer;

  :focus-visible::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0px 0px 3px 2px ${theme.colors.accent[70]};
  }

  ::after {
    content: '';
    display: block;
    position: absolute;
    box-sizing: border-box;
    border-radius: 50%;
    transition-duration: 0.3s;

    ${props => {
      const styles: CSSObject = {
        top: 1.3,
        left: 1.3,
        width: 16,
        height: 16,
        backgroundColor: theme.colors.white,
      };

      if (props.checked) {
        styles.left = props.checked === 'halfOn' ? '7px' : '13px';
      }

      if (props.size === SizeTokenValue.Small) {
        styles.width = styles.height = 12;
      }

      if (props.readOnly) {
        styles.backgroundColor = theme.colors.grey[80];
      }

      if (props.error) {
        styles.backgroundColor = theme.colors.red[80];
      }

      return styles;
    }}
  }

  ${({size, checked, error, readOnly, disabled}) => {
    const styles: CSSObject = {
      width: 32,
      height: 20,
    };

    if (size === SizeTokenValue.Small) {
      styles.width = 28;
      styles.height = 16;
    }

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
        borderColor: theme.colors.grey[30],
        color: theme.colors.grey[80],
        cursor: 'default',
      };
    }

    if (disabled) {
      if (checked) {
        const backgroundColor = checked === 'halfOn' ? theme.colors.additional.yellow[20] : theme.colors.accent[20];

        return {
          ...styles,
          backgroundColor,
          borderColor: backgroundColor,
          cursor: 'default',
        };
      }

      return {
        ...styles,
        backgroundColor: theme.colors.grey[20],
        borderColor: theme.colors.grey[20],
        cursor: 'default',
      };
    }

    if (checked) {
      const color = checked === 'halfOn' ? theme.colors.additional.yellow[60] : theme.colors.accent[90];
      const hoverColor = checked === 'halfOn' ? theme.colors.additional.yellow[40] : theme.colors.accent[80];

      return {
        ...styles,
        backgroundColor: color,
        borderColor: color,

        ':hover': {
          backgroundColor: hoverColor,
          borderColor: hoverColor,
        },
      };
    }

    return {
      ...styles,
      backgroundColor: theme.colors.grey[30],
      borderColor: theme.colors.grey[30],

      ':hover': {
        backgroundColor: theme.colors.grey[40],
        borderColor: theme.colors.grey[40],
      },
    };
  }}
`;

export const Icon: React.FC<SwitchStyles & {inputRef: RefObject<HTMLInputElement>}> = ({inputRef, ...props}) => {
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      inputRef.current?.click();
    }
  };

  const containerProps = {
    tabIndex: props.disabled || props.readOnly ? undefined : 0,

    ...props,

    onKeyDown,
  };

  return <Container {...containerProps} />;
};
