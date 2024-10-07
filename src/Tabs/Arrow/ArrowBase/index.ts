import styled from '@emotion/styled';

import {theme} from 'theme';

export const ArrowBase = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 24px;
  height: 40px;
  top: 0;
  color: ${theme.colors.grey[40]};
  pointer-events: none;
  z-index: 1;
  cursor: default;

  ::after {
    content: '';
    position: absolute;
    top: 0;
    width: 60px;
    height: 40px;
    opacity: 0;
    transition-duration: 0.3s;
  }

  &[data-active] {
    cursor: pointer;
    pointer-events: all;

    ::after {
      opacity: 1;
    }
  }
`;
