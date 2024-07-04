import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import {Asterisk} from '../Asterisk';
import type {InputProps} from '../types';

const Container = styled.div<Pick<InputProps, 'size' | 'filled'>>`
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
      padding-right: 10px;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;
      overflow: hidden;
    }

    svg {
      position: absolute;
      right: 3px;
    }
  }

  ${({size, filled}) => {
    if (filled) {
      return {
        top: 4,
        height: 16,
        fontSize: theme.spaces.x6,
        letterSpacing: '0.08px',
        visibility: size === SizeTokenValue.Small ? 'hidden' : 'visible',
      };
    }

    return {
      top: 0,
      height: '100%',
      fontSize: theme.spaces.x8,
    };
  }}
`;

export const Label: React.FC<InputProps> = props => {
  const {label, filled} = props;

  if (typeof label === 'function') {
    return label(props);
  }

  return (
    <Container filled={filled}>
      <div>
        <label>{label}</label>
        <Asterisk />
      </div>
    </Container>
  );
};
