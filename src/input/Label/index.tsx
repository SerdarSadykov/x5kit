import styled from '@emotion/styled';

import {theme} from 'theme';

import {Asterisk} from '../Asterisk';
import type {InputInternalProps, InputStyles} from '../types';

const Container = styled.div<InputStyles>`
  position: absolute;
  display: flex;
  align-items: center;
  user-select: none;
  pointer-events: none;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  transition-duration: 0.2s;
  letter-spacing: 0.12px;

  div {
    position: relative;
    max-width: 100%;

    label {
      display: block;
      padding-right: 10px;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;
      overflow: hidden;
    }

    svg {
      position: absolute;
      top: 0;
      right: 3px;
    }
  }

  ${({isSmall, isFilled, isFocused, isMasked}) => {
    if (isFilled) {
      return {
        top: 4,
        height: 16,
        fontSize: theme.spaces.x6,
        letterSpacing: '0.08px',
        display: isSmall ? 'none' : undefined,
      };
    }

    if (isFocused && isMasked) {
      return {
        display: 'none',
      };
    }

    return {
      top: 0,
      height: '100%',
      fontSize: theme.spaces.x8,
    };
  }}
`;

export const Label: React.FC<InputInternalProps> = ({label, style}) => {
  if (!label) {
    return null;
  }

  if (typeof label === 'function') {
    return label(style);
  }

  return (
    <Container {...style}>
      <div>
        <label>{label}</label>
        <Asterisk />
      </div>
    </Container>
  );
};
