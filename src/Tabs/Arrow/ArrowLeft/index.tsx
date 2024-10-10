import {useEffect, useRef} from 'react';
import styled from '@emotion/styled';

import {SizeTokenValue} from 'theme';
import {ChevronLeft} from 'icons';

import {ArrowBase} from '../ArrowBase';

import type {ArrowProps} from '../types';

const Component = styled(ArrowBase)`
  left: 0;

  &[data-active] {
    background: linear-gradient(
      to right,
      var(--arrow-start, rgba(255, 255, 255, 1)),
      var(--arrow-center, rgba(255, 255, 255, 0.8))
    );
  }

  ::after {
    left: 100%;
    border-radius: 0 10px 10px 0;
    background: linear-gradient(
      to right,
      var(--arrow-center, rgba(255, 255, 255, 0.8)),
      var(--arrow-end, rgba(255, 255, 255, 0.1)) 70%
    );
  }
`;

export const ArrowLeft: React.FC<ArrowProps> = ({scrollableRef, qa}) => {
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    scrollableRef.current?.scrollBy?.({left: -100, behavior: 'smooth'});
  };

  useEffect(() => {
    const scrollableEl = scrollableRef.current;

    const onScroll = () => {
      if (!scrollableEl) {
        return;
      }

      ref.current?.toggleAttribute('data-active', scrollableEl?.scrollLeft > 10);
    };

    scrollableEl?.addEventListener('scroll', onScroll);

    return () => {
      scrollableEl?.removeEventListener('scroll', onScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Component ref={ref} data-qa={`${qa}-arrow-left`} onClick={onClick}>
      <ChevronLeft size={SizeTokenValue.Small} />
    </Component>
  );
};
