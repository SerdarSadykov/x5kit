import styled from '@emotion/styled';

import {theme} from 'theme';

import {InputInternalProps, InputStyles} from '../types';

const Container = styled.div<InputStyles>`
  padding: 4px 0;
  width: 100%;
  font-size: ${theme.spaces.x6}px;
  line-height: ${theme.spaces.x8}px;
  letter-spacing: 0.08px;
  word-break: break-all;

  ${props => ({
    color: props.error ? theme.colors.additional.red[80] : theme.colors.grey[60],
  })}
`;

export const Caption: React.FC<InputInternalProps> = ({props, style}) => {
  const children = style.error || props.caption;

  if (!children) {
    return null;
  }

  return <Container {...props.style}>{children}</Container>;
};
