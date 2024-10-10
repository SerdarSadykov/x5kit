import {useRef} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import type {ModalContentProps} from '../types';

const Container = styled.div`
  padding: 0 24px;
  overflow: auto;
  word-break: break-word;

  ${theme.typography.p1}
  ${theme.scroll}

  &[data-overflown] {
    padding-top: 12px;
    padding-bottom: 12px;
    border-style: solid;
    border-width: 1px 0 1px 0;
    border-color: ${theme.colors.grey[20]};
  }
`;

export const ModalContent: React.FC<ModalContentProps> = props => {
  const {children, noBorderScroll, qa = 'modal-content', ...rest} = props;

  const observerRef = useRef<ResizeObserver>();

  const ref = (el: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = undefined;
    }

    if (!el || noBorderScroll) {
      return;
    }

    observerRef.current = new ResizeObserver(entries => {
      const target = entries[0]?.target;
      if (!target) {
        return;
      }

      target.toggleAttribute('data-overflown', target.scrollHeight > target.clientHeight);
    });

    observerRef.current.observe(el);
  };

  return (
    <Container {...rest} ref={ref} data-qa={qa}>
      {children}
    </Container>
  );
};
