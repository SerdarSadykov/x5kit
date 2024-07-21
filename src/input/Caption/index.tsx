import styled from '@emotion/styled';

import {theme} from 'theme';

import {InputInternalProps, InputStyles} from '../types';

const Container = styled.div<InputStyles>`
  padding: 4px 0;
  width: 100%;
  word-break: break-all;

  ${theme.typography.p3}

  ${props => ({
    position: props.isAbsoluteCaption ? 'absolute' : undefined,
    color: props.isError ? theme.colors.additional.red[80] : theme.colors.grey[60],
  })}
`;

export const Caption: React.FC<InputInternalProps> = ({error, caption, style}) => {
  if (typeof caption === 'function') {
    return caption({...style, error});
  }

  const children = error && typeof error === 'string' ? error : caption;

  if (!children) {
    return null;
  }

  return <Container {...style}>{children}</Container>;
};
