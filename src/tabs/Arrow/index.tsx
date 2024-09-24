import {RefObject, useEffect, useRef} from 'react';
import styled from '@emotion/styled';

import {ChevronLeft, ChevronRight} from 'icons';
import {SizeTokenValue, theme} from 'theme';

const Arrow = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 24px;
  height: 40px;
  top: 0;
  color: ${theme.colors.grey[40]};
  cursor: default;
  pointer-events: none;
  z-index: 1;

  ::after {
    content: '';
    position: absolute;
    top: 0;
    width: 60px;
    height: 40px;
    opacity: 0;
    transition-duration: 0.3s;
  }

  &[data-scroll] {
    cursor: pointer;
    pointer-events: all;

    ::after {
      opacity: 1;
    }
  }
`;

const ArrowLeftComponent = styled(Arrow)`
  left: 0;

  &[data-scroll] {
    background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8));
  }

  ::after {
    left: 100%;
    border-radius: 0 10px 10px 0;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1) 70%);
  }
`;

const ArrowRightComponent = styled(Arrow)`
  right: 0;

  &[data-scroll] {
    background: linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8));
  }

  ::after {
    right: 100%;
    border-radius: 10px 0 0 10px;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1) 70%);
  }
`;

type ArrowProps = {
  containerRef: RefObject<HTMLDivElement>;
};

export const ArrowLeft: React.FC<ArrowProps> = ({containerRef}) => {
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.scrollBy({left: -100, behavior: 'smooth'});
  };

  const onScroll = () => {
    if (!containerRef.current) {
      return;
    }

    ref.current?.toggleAttribute('data-scroll', containerRef.current?.scrollLeft > 10);
  };

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    onScroll();

    containerRef.current.addEventListener('scroll', onScroll);

    return () => {
      containerRef.current?.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <ArrowLeftComponent ref={ref} onClick={onClick}>
      <ChevronLeft size={SizeTokenValue.Small} />
    </ArrowLeftComponent>
  );
};

export const ArrowRight: React.FC<ArrowProps> = ({containerRef}) => {
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.scrollBy({left: 100, behavior: 'smooth'});
  };

  const onScroll = () => {
    if (!containerRef.current) {
      return;
    }

    const {scrollLeft, scrollWidth, clientWidth} = containerRef.current;

    ref.current?.toggleAttribute('data-scroll', scrollLeft + clientWidth + 10 < scrollWidth);
  };

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    onScroll();

    containerRef.current.addEventListener('scroll', onScroll);

    return () => {
      containerRef.current?.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <ArrowRightComponent ref={ref} onClick={onClick}>
      <ChevronRight size={SizeTokenValue.Small} />
    </ArrowRightComponent>
  );
};
