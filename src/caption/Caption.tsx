import styled from '@emotion/styled';

import {theme} from 'theme';

import {CaptionProps} from './types';

const Container = styled.div<CaptionProps>`
  padding: 4px 0;
  width: 100%;
  word-break: break-all;

  ${theme.typography.p3}

  ${props => ({
    position: props.absolute ? 'absolute' : undefined,
    color: props.error ? theme.colors.additional.red[80] : theme.colors.grey[60],
  })}
`;

export const Caption: React.FC<CaptionProps> = ({children, ...style}) => {
  if (!children) {
    return null;
  }

  return <Container {...style}>{children}</Container>;
};
