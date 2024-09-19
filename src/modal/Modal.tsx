import React, {CSSProperties} from 'react';
import styled from '@emotion/styled';
import {FloatingFocusManager, FloatingOverlay, FloatingPortal} from '@floating-ui/react';

import {SizeTokenValue, theme} from 'theme';

import {useModal} from './hook';
import {ModalProps} from './types';

const Container = styled.div<Pick<ModalProps, 'size'>>`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: ${theme.colors.white};
  max-width: calc(100% - 40px);
  max-height: calc(100% - 40px);

  box-shadow: ${theme.shadows.medium};

  ${({size = SizeTokenValue.Medium}) => {
    let width = size;

    switch (size) {
      case SizeTokenValue.XLarge:
        width = 1160;
        break;
      case SizeTokenValue.Large:
        width = 920;
        break;
      case SizeTokenValue.Medium:
        width = 620;
        break;
      case SizeTokenValue.Small:
        width = 440;
        break;
    }

    return {width};
  }}
`;

const overlayStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  background: 'rgba(59, 64, 71, 0.6)',
};

export const Modal: React.FC<ModalProps> = props => {
  const {floating, floatingI, hasTarget} = useModal(props);

  const Wrapper = props.isPortal ? FloatingPortal : React.Fragment;

  if (!props.isOpen) {
    return;
  }

  const overlayProps = !hasTarget ? {lockScroll: true, style: overlayStyles} : undefined;

  const containerProps = {
    ...floatingI.getFloatingProps(),

    size: props.size,
    children: props.children,

    style: hasTarget ? floating.floatingStyles : undefined,
  };

  return (
    <Wrapper>
      <FloatingOverlay {...overlayProps}>
        <FloatingFocusManager context={floating.context}>
          <Container ref={floating.refs.setFloating} {...containerProps} />
        </FloatingFocusManager>
      </FloatingOverlay>
    </Wrapper>
  );
};
