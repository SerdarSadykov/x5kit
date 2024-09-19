import React from 'react';
import styled from '@emotion/styled';
import {FloatingPortal} from '@floating-ui/react';

import {theme} from 'theme';

import {useDropdown} from './hook';
import {DropdownProps} from './types';

const Container = styled.div<Pick<DropdownProps, 'width' | 'height' | 'maxHeight' | 'zIndex' | 'isOpen' | 'isMounted'>>`
  ${({isOpen, isMounted, zIndex, height, maxHeight, width = 248}) => {
    if (isOpen || !isMounted) {
      return {
        zIndex,
        height,
        maxHeight,
        width: width !== 'target' ? width : undefined,
      };
    }

    return {
      position: 'fixed',
      visibility: 'hidden',
      overflow: 'hidden',
      width: 0,
      height: 0,
    };
  }}
`;

export const DropdownContent = styled.div`
  height: 100%;
  border-radius: 8px;
  box-shadow: ${theme.shadows.medium};
  background-color: ${theme.colors.white};
`;

export const Dropdown: React.FC<DropdownProps> = props => {
  const {children, isOpen, width, height, maxHeight, zIndex, isPortal, isMounted, qa = 'dropdown'} = props;

  const {interactions, floating} = useDropdown(props);

  if (!isMounted && !isOpen) {
    return null;
  }

  const Wrapper = isPortal ? FloatingPortal : React.Fragment;

  const containerProps = {
    ...interactions.getFloatingProps(),

    children,
    isOpen,
    isMounted,
    width,
    height,
    maxHeight,
    zIndex,

    style: floating.floatingStyles,

    'data-qa': qa,
  };

  return (
    <Wrapper>
      <Container ref={floating.refs.setFloating} {...containerProps} />
    </Wrapper>
  );
};
