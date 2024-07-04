import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import {Label} from '../Label';
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

export const Field: React.FC<InputProps> = props => {
  return (
    <Container>
      <Input {...props} />
      <Label {...props} />
    </Container>
  );
};
