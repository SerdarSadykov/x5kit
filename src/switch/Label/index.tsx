import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import type {MouseEventHandler} from 'react';

import type {SwitchProps, SwitchStyles} from '../types';

const Container = styled.div<SwitchStyles>`
  min-width: 0;
  word-wrap: break-word;
  user-select: none;
  overflow: hidden;
  text-overflow: ellipsis;

  ${props => {
    const styles = {
      whiteSpace: props.whiteSpace,
      color: theme.colors.grey[props.disabled ? 40 : 100],
    };

    if (props.size === SizeTokenValue.Small) {
      return {
        ...styles,
        ...theme.typography.p2,
      };
    }

    return {
      ...styles,
      ...theme.typography.p1compact,
    };
  }}
`;

export const Label: React.FC<Pick<SwitchProps, 'children' | 'label'> & SwitchStyles> = props => {
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
      {children ?? label}
    </Container>
  );
};
