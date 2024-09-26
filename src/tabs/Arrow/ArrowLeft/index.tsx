import {useEffect, useRef} from 'react';
import styled from '@emotion/styled';

import {SizeTokenValue} from 'theme';
import {ChevronLeft} from 'icons';

import {ArrowBase} from '../ArrowBase';
import {ArrowProps} from '../types';

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

export const ArrowLeft: React.FC<ArrowProps> = ({scrollableRef}) => {
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    scrollableRef.current?.scrollBy({left: -100, behavior: 'smooth'});
  };

  const onScroll = () => {
    if (!scrollableRef.current) {
      return;
    }

    ref.current?.toggleAttribute('data-active', scrollableRef.current?.scrollLeft > 10);
  };

  useEffect(() => {
    onScroll();

    scrollableRef.current?.addEventListener('scroll', onScroll);

    return () => {
      scrollableRef.current?.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Component ref={ref} onClick={onClick}>
      <ChevronLeft size={SizeTokenValue.Small} />
    </Component>
  );
};
