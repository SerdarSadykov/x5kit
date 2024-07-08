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
    position: props.isAbsoluteCaption ? 'absolute' : undefined,
    color: props.isError ? theme.colors.additional.red[80] : theme.colors.grey[60],
  })}
`;

export const Caption: React.FC<InputInternalProps> = ({error, caption, style}) => {
  if (typeof caption === 'function') {
    return caption({...style, error});
  }

  const children = error || caption;

  if (!children) {
    return null;
  }

  return <Container {...style}>{children}</Container>;
};
