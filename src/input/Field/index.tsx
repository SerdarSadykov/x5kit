import styled from '@emotion/styled';

import {theme} from 'theme';

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
  min-height: 48px;
  box-sizing: border-box;
  padding: ${props => (props.filled ? 14 : 0)}px 0 0;
  outline: none;
  border: none;
  font-size: ${theme.spaces.x8}px;
  line-height: ${theme.spaces.x12}px;
  letter-spacing: 0.12px;
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

const Label = styled.label<Pick<InputProps, 'filled'>>`
  display: block;
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
    top: ${props => (props.filled ? 6 : 2)}px;
    right: 3px;
  }
`;

export const Field: React.FC<InputProps> = props => {
  const {label, filled} = props;

  return (
    <Container>
      <Input {...props} />

      {label && (
        <LabelContainer filled={filled}>
          <Label filled={filled}>
            <div>{label}</div>
            <Asterisk />
          </Label>
        </LabelContainer>
      )}
    </Container>
  );
};
