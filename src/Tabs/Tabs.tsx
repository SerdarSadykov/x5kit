import {createContext, forwardRef, useEffect, useRef} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import {Arrow} from './Arrow';
import {Scrollable} from './Scrollable';

import type {MouseEventHandler} from 'react';
import type {TabsProps} from './types';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  white-space: nowrap;
  width: fit-content;
  border-bottom: 1px solid ${theme.colors.grey[20]};

  ::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 2px;
    width: var(--width);
    left: var(--offset);
    background-color: ${theme.colors.accent[90]};
    transition-duration: 0.3s;
  }
`;

export const TabsValueContext = createContext<string | undefined>(undefined);

export const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {children, value, onChange, arrows, qa = 'tabs'} = props;

  const scrollableRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setTimeout(() => {
      if (!scrollableRef.current) {
        return;
      }

      const currentTab = scrollableRef.current.querySelector<HTMLDivElement>(`[data-tab=${JSON.stringify(value)}]`);

      scrollableRef.current.style.setProperty('--width', `${currentTab?.clientWidth ?? 0}px`);
      scrollableRef.current.style.setProperty('--offset', `${currentTab?.offsetLeft ?? 0}px`);
    });
  }, [value, arrows]);

  return (
    <TabsValueContext.Provider value={value}>
      <Container ref={ref} data-qa={qa} onClick={onClick}>
        <Scrollable ref={scrollableRef} qa={qa} value={value} arrows={arrows}>
          <Content>{children}</Content>
        </Scrollable>
        {arrows && <Arrow qa={qa} scrollableRef={scrollableRef} />}
      </Container>
    </TabsValueContext.Provider>
  );
});
