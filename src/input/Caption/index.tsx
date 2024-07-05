import styled from '@emotion/styled';

import {theme} from 'theme';

import {InputProps} from '../types';

const Container = styled.div<CaptionProps>`
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

type CaptionProps = Pick<InputProps, 'error' | 'caption'>;

export const Caption: React.FC<CaptionProps> = props => {
  const children = props.error || props.caption;

  if (!children) {
    return null;
  }

  return <Container {...props}>{children}</Container>;
};
