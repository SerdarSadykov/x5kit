import styled from '@emotion/styled';

import {theme} from 'theme';

import {InputProps, InputStyles} from '../types';

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;
`;

const Input = styled.input`
  position: relative;
  width: 100%;
  min-height: 48px;
  box-sizing: border-box;
  padding: 0;
  outline: none;
  border: none;
`;

const LabelContainer = styled.div<InputStyles>`
  position: absolute;
  display: flex;
  align-items: center;
  user-select: none;
  pointer-events: none;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  transition-duration: 0.2s;
  color: ${theme.colors.grey[60]};

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

const Label = styled.label`
  display: block;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
`;

export const Field: React.FC<InputProps & InputStyles> = props => {
  const {label} = props;

  return (
    <Container>
      <Input {...props} />

      {label && (
        <LabelContainer {...props}>
          <Label>{label}</Label>
        </LabelContainer>
      )}
    </Container>
  );
};
