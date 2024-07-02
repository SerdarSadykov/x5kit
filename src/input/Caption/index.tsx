import styled from '@emotion/styled';

import {theme} from 'theme';

import {InputProps, InputStyles} from '../types';

const Container = styled.div<InputStyles>`
  padding: 4px 0;
  width: 100%;
  color: ${({error}) => (error ? theme.colors.additional.red[80] : theme.colors.grey[60])};
  font-size: ${theme.spaces.x6}px;
  line-height: ${theme.spaces.x8}px;
  letter-spacing: 0.08px;
  word-break: break-all;
`;

export const Caption: React.FC<InputProps & InputStyles> = props => {
  const children = props.error || props.caption;

  if (!children) {
    return null;
  }

  return <Container {...props}>{children}</Container>;
};
