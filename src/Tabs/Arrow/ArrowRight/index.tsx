import {useEffect, useRef} from 'react';
import styled from '@emotion/styled';

import {ChevronRight} from 'icons';
import {SizeTokenValue} from 'theme';

import {ArrowBase} from '../ArrowBase';

import type {ArrowProps} from '../types';

const ArrowRightComponent = styled(ArrowBase)`
  right: 0;

  &[data-active] {
    background: linear-gradient(
      to left,
      var(--arrow-start, rgba(255, 255, 255, 1)),
      var(--arrow-center, rgba(255, 255, 255, 0.8))
    );
  }

  ::after {
    right: 100%;
    border-radius: 10px 0 0 10px;
    background: linear-gradient(
      to left,
      var(--arrow-center, rgba(255, 255, 255, 0.8)),
      var(--arrow-end, rgba(255, 255, 255, 0.1)) 70%
    );
  }
`;

export const ArrowRight: React.FC<ArrowProps> = ({scrollableRef, qa}) => {
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    scrollableRef.current?.scrollBy?.({left: 100, behavior: 'smooth'});
  };

  useEffect(() => {
    const scrollableEl = scrollableRef.current;

    const onScroll = () => {
      if (!scrollableEl) {
        return;
      }

      const {scrollLeft, scrollWidth, clientWidth} = scrollableEl;

      ref.current?.toggleAttribute('data-active', scrollLeft + clientWidth + 10 < scrollWidth);
    };

    onScroll();

    scrollableEl?.addEventListener('scroll', onScroll);

    return () => {
      scrollableEl?.removeEventListener('scroll', onScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ArrowRightComponent ref={ref} data-qa={`${qa}-arrow-right`} onClick={onClick}>
      <ChevronRight size={SizeTokenValue.Small} />
    </ArrowRightComponent>
  );
};
