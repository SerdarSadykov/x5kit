import {MouseEventHandler} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import {CheckboxProps, CheckboxStyles} from '../types';

const Container = styled.div<CheckboxStyles>`
  min-width: 0;
  word-wrap: break-word;
  user-select: none;
  color: ${props => theme.colors.grey[props.disabled ? 40 : 100]};

  ${theme.typography.p1compact}
`;

export const Label: React.FC<Pick<CheckboxProps, 'children' | 'label'> & CheckboxStyles> = props => {
  if (!props.hasLabel) {
    return null;
  }

  const {children, label, ...styles} = props;

  const onClick: MouseEventHandler<HTMLDivElement> = e => {
    if (!(e.target instanceof Element)) {
      return;
    }

    if (['a', 'button'].includes(e.target.nodeName)) {
      e.stopPropagation();
      return;
    }
  };

  return (
    <Container onClickCapture={onClick} {...styles}>
      {label}
      {children}
    </Container>
  );
};
