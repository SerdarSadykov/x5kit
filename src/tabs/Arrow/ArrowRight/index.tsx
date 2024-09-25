import {useEffect, useRef} from 'react';
import styled from '@emotion/styled';

import {ChevronRight} from 'icons';
import {SizeTokenValue} from 'theme';

import {ArrowBase} from '../ArrowBase';
import {ArrowProps} from '../types';

const ArrowRightComponent = styled(ArrowBase)`
  right: 0;

  &[data-active] {
    background: linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8));
  }

  ::after {
    right: 100%;
    border-radius: 10px 0 0 10px;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1) 70%);
  }
`;


export const ArrowRight: React.FC<ArrowProps> = ({scrollableRef}) => {
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    scrollableRef.current?.scrollBy({left: 100, behavior: 'smooth'});
  };

  const onScroll = () => {
    if (!scrollableRef.current) {
      return;
    }

    const {scrollLeft, scrollWidth, clientWidth} = scrollableRef.current;

    ref.current?.toggleAttribute('data-active', scrollLeft + clientWidth + 10 < scrollWidth);
  };

  useEffect(() => {
    onScroll();

    scrollableRef.current?.addEventListener('scroll', onScroll);

    return () => {
      scrollableRef.current?.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <ArrowRightComponent ref={ref} onClick={onClick}>
      <ChevronRight size={SizeTokenValue.Small} />
    </ArrowRightComponent>
  );
};
