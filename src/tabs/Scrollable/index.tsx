import {forwardRef, PropsWithChildren, useEffect, useRef, WheelEventHandler} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import {TabsProps} from '../types';

const Container = styled.div`
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;

  ${theme.scroll};

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  :hover::-webkit-scrollbar-thumb {
    background-color: #cfd4dc;
  }

  + div {
    display: none;
  }

  &[data-arrows] {
    padding: 0 24px;

    + div {
      display: block;
    }
  }
`;

type ScrollableProps = Pick<TabsProps, 'value' | 'arrows'> & PropsWithChildren;

export const Scrollable = forwardRef<HTMLDivElement, ScrollableProps>(({children, value, arrows}, ref) => {
  const observerRef = useRef<ResizeObserver>();

  const onWheel: WheelEventHandler<HTMLDivElement> = e => {
    if (!ref || typeof ref !== 'object' || !ref.current) {
      return;
    }

    const newScrollLeft = ref.current.scrollLeft + e.deltaY;

    ref.current.scrollLeft = newScrollLeft > 0 ? newScrollLeft : 0;
  };

  const setObserver = (el: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = undefined;
    }

    if (!ref || typeof ref !== 'object') {
      return;
    }

    ref.current = el;

    if (!arrows || !el) {
      ref.current?.removeAttribute('data-arrows');
      return;
    }

    observerRef.current = new ResizeObserver(entries => {
      const target = entries[0]?.target;
      if (!target || !ref.current) {
        return;
      }

      ref.current.toggleAttribute('data-arrows', target.scrollWidth > target.clientWidth);
    });

    observerRef.current.observe(el);
  };

  useEffect(() => {
    if (!ref || typeof ref !== 'object' || !ref.current) {
      return;
    }

    ref.current.toggleAttribute('data-arrows', !!arrows && ref.current.scrollWidth > ref.current.clientWidth);
  }, [value, arrows]);

  return (
    <Container ref={setObserver} onWheel={onWheel}>
      {children}
    </Container>
  );
});
