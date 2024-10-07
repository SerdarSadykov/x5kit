import {forwardRef} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import type {SegmentedControlOption} from '../types';

const Label = styled.label`
  position: relative;
  flex-grow: 1;

  :focus-visible::before {
    content: '';
    display: block;
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 3px 2px ${theme.colors.accent[70]};
    border-radius: 4px;
    z-index: 1;
  }
`;

const Content = styled.span<Pick<SegmentedControlOption, 'disabled' | 'readOnly'>>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex-shrink: 0;
  border-radius: 4px;
  border: 2px solid transparent;
  user-select: none;

  ${theme.typography.p1}

  ${({readOnly, disabled}) => {
    if (disabled) {
      return {
        borderColor: theme.colors.grey[20],
        backgroundColor: theme.colors.grey[20],
        color: theme.colors.grey[40],
        cursor: 'default',
      };
    }

    return {
      borderColor: theme.colors.grey[20],
      backgroundColor: theme.colors.grey[20],
      color: theme.colors.grey[60],
      cursor: readOnly ? 'default' : 'pointer',

      ':hover': {
        backgroundColor: theme.colors.grey[30],
        borderColor: theme.colors.grey[30],
        color: theme.colors.grey[100],
      },
    };
  }}
`;

const Input = styled.input`
  position: absolute;
  visibility: hidden;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  padding: 0;

  :checked + span {
    cursor: default;
    color: ${theme.colors.grey[100]};
    background-color: ${theme.colors.white};
    border-color: ${theme.colors.grey[30]};
  }
`;

export const SegmentedControlItem = forwardRef<HTMLInputElement, SegmentedControlOption>((props, ref) => {
  const {label, qa, disabled, readOnly, ...rest} = props;
  const isEnabled = !disabled && !readOnly;

  const inputProps = {
    ...rest,

    disabled,
    readOnly,

    type: 'radio',
    onChange: isEnabled ? rest.onChange : undefined,
  };

  const labelProps = {
    disabled,
    readOnly,

    children: label,
  };

  return (
    <Label data-qa={qa} tabIndex={isEnabled ? 0 : undefined}>
      <Input ref={ref} {...inputProps} />
      <Content {...labelProps} />
    </Label>
  );
});
