import {forwardRef, MouseEventHandler, useLayoutEffect, WheelEventHandler} from 'react';
import styled from '@emotion/styled';

import {useRefMerge} from 'common';
import {theme} from 'theme';

import {TabsProps} from './types';

const Container = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  ${theme.scroll};
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  white-space: nowrap;
  width: 100%;
  border-bottom: 1px solid ${theme.colors.grey[20]};

  ::after {
    content: '';
    position: absolute;
    bottom: -1px;
    height: 2px;
    width: var(--width);
    left: var(--offset);
    background-color: ${theme.colors.accent[90]};
    transition-duration: 0.3s;
  }
`;

export const Tabs: React.FC<TabsProps> = forwardRef<HTMLDivElement, TabsProps>((props, baseRef) => {
  const {children, value, onChange} = props;

  const ref = useRefMerge<HTMLDivElement>(baseRef);

  const onClick: MouseEventHandler<HTMLDivElement> = e => {
    let targetTab = e.target as HTMLDivElement | undefined;

    while (targetTab && typeof targetTab.dataset?.tab === 'undefined') {
      targetTab = targetTab.parentNode as HTMLDivElement | undefined;
    }

    const targetValue = targetTab?.dataset?.tab;

    if (typeof targetValue === 'undefined') {
      return;
    }

    onChange(targetValue, e);
  };

  const onWheel: WheelEventHandler<HTMLDivElement> = e => {
    if (!ref.current) {
      return;
    }

    const newScrollLeft = ref.current.scrollLeft + e.deltaY;

    ref.current.scrollLeft = newScrollLeft > 0 ? newScrollLeft : 0;
  };

  useLayoutEffect(() => {
    if (!ref.current || typeof value === 'undefined') {
      return;
    }

    const currentTab = ref.current.querySelector<HTMLDivElement>(`[data-tab=${JSON.stringify(String(value))}]`);
    if (!currentTab) {
      return;
    }

    ref.current.style.setProperty('--width', `${currentTab.clientWidth}px`);
    ref.current.style.setProperty('--offset', `${currentTab.offsetLeft}px`);
  }, [value]);

  return (
    <Container ref={ref} onClick={onClick} onWheel={onWheel}>
      <Content>{children}</Content>
    </Container>
  );
});
