import React from 'react';
import styled from '@emotion/styled';
import {FloatingArrow, FloatingPortal} from '@floating-ui/react';

import {theme} from 'theme';

import {useTooltip} from './hook';
import {TooltipProps} from './types';

const Container = styled.div`
  padding: 10px 12px;
  border-radius: 4px;
  box-sizing: border-box;

  ${theme.typography.p2}
`;

export const Tooltip: React.FC<TooltipProps> = props => {
  const {
    content,
    width,
    whiteSpace,
    qa,

    isPortal = true,
    zIndex = theme.sizes.zIndex.tooltip,
    color = theme.colors.white,
    backgroundColor = theme.colors.grey[90],
  } = props;

  const {isMounted, popper, interactions, arrowRef, styles, child} = useTooltip(props);

  if (!isMounted) {
    return child;
  }

  const containerProps = {
    ...interactions.getFloatingProps(),

    ref: popper.refs.setFloating,

    style: {
      ...styles,
      ...popper.floatingStyles,

      width,
      whiteSpace,
      zIndex,

      color: color,
      backgroundColor: backgroundColor,
    },
  };

  const arrowProps = {
    width: 8,
    height: 4,

    ref: arrowRef,
    context: popper.context,
    fill: backgroundColor,
  };

  const Wrapper = isPortal ? FloatingPortal : React.Fragment;

  return (
    <>
      {child}
      <Wrapper>
        <Container {...containerProps}>
          {content}

          <FloatingArrow {...arrowProps} />
        </Container>
      </Wrapper>
    </>
  );
};
