import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import type {MouseEventHandler} from 'react';
import type {RequiredQA} from 'common';

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

type LabelProps = Pick<SwitchProps, 'children' | 'label'> & SwitchStyles & RequiredQA;

export const Label: React.FC<LabelProps> = props => {
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
    <Container data-qa={`${props.qa}-label`} onClickCapture={onClick} {...styles}>
      {children ?? label}
    </Container>
  );
};
