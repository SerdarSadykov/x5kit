import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import {Asterisk} from '../Asterisk';
import type {InputProps} from '../types';

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;
`;

const Input = styled.input<InputProps>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  outline: none;
  border: none;
  font-size: ${theme.spaces.x8}px;
  line-height: ${theme.spaces.x12}px;
  letter-spacing: 0.12px;

  ${({size, filled}) => ({
    minHeight: size === SizeTokenValue.Small ? 32 : 48,
    paddingTop: filled && size !== SizeTokenValue.Small ? 14 : 0,
  })}
`;

const LabelContainer = styled.div<Pick<InputProps, 'filled'>>`
  position: absolute;
  display: flex;
  align-items: center;
  user-select: none;
  pointer-events: none;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  transition-duration: 0.2s;
  font-size: ${theme.spaces.x8}px;
  line-height: ${theme.spaces.x12}px;
  letter-spacing: 0.12px;

  ${({filled}) => {
    if (filled) {
      return {
        top: 4,
        height: 16,
        fontSize: theme.spaces.x6,
        lineHeight: `${theme.spaces.x12}px`,
        letterSpacing: '0.08px',
      };
    }

    return {
      top: 0,
      height: '100%',
    };
  }}
`;

const Label = styled.label<Pick<InputProps, 'filled' | 'size'>>`
  position: relative;
  max-width: 100%;

  & div {
    padding-right: 10px;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    overflow: hidden;
  }

  & svg {
    position: absolute;
    right: 3px;

    ${({filled, size}) => ({
      top: filled && size ? 6 : 2,
    })}
  }

  ${({size, filled}) => ({
    display: size === SizeTokenValue.Small && filled ? 'none' : 'block',
  })}
`;

export const Field: React.FC<InputProps> = props => {
  const {label, size, filled} = props;

  return (
    <Container>
      <Input {...props} />

      {label && (
        <LabelContainer filled={filled}>
          <Label filled={filled} size={size}>
            <div>{label}</div>
            <Asterisk />
          </Label>
        </LabelContainer>
      )}
    </Container>
  );
};
