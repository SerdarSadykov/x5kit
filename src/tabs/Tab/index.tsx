import {forwardRef, useContext} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import {TabsValueContext} from '../Tabs';
import {TabBadge} from '../TabBadge';

import type {ElementType, KeyboardEventHandler, MouseEventHandler} from 'react';
import type {TabProps} from '../types';

const Container = styled.div<Pick<TabProps, 'disabled'> & {selected: boolean}>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  user-select: none;
  text-decoration: none;

  ${theme.typography.p1}

  :focus-visible {
    border: 0;
    outline: none;
  }

  :focus-visible::after {
    content: '';
    display: block;
    position: absolute;
    box-sizing: border-box;
    top: 2px;
    left: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 2px;
    box-shadow: 0px 0px 3px 2px ${theme.colors.accent[70]};
  }

  ${props => {
    if (props.disabled) {
      return {
        color: theme.colors.grey[40],
      };
    }

    return {
      cursor: props.selected ? 'default' : 'pointer',
      color: theme.colors.grey[100],

      svg: {
        color: theme.colors.grey[60],
      },

      ':hover': {
        backgroundColor: theme.colors.grey[20],
      },
    };
  }}
`;

export const Tab = forwardRef<HTMLDivElement, TabProps>((props, ref) => {
  const {children, label, icon, badge, value, disabled, ...rest} = props;

  const selected = useContext(TabsValueContext) === value;

  const onClickCapture: MouseEventHandler<HTMLDivElement> = e => {
    if (disabled || selected) {
      e.stopPropagation();
    }

    rest.onClickCapture?.(e);
  };

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    const target = e.target as HTMLDivElement | undefined;
    const prev = target?.previousElementSibling as HTMLDivElement | undefined;
    const next = target?.nextElementSibling as HTMLDivElement | undefined;

    switch (e.code) {
      case 'Enter':
      case 'NumpadEnter':
        target?.click?.();
        break;
      case 'ArrowLeft':
        prev?.focus?.();
        break;
      case 'ArrowRight':
        next?.focus?.();
        break;
    }

    props.onKeyDown?.(e);
  };

  const containerProps = {
    ...rest,

    disabled,
    selected,
    onClickCapture,
    onKeyDown,

    'data-tab': value,

    as: props.href ? ('a' as ElementType) : undefined,

    tabIndex: disabled ? undefined : 0,
  };

  const badgeProps = {value, badge, disabled};

  return (
    <Container ref={ref} {...containerProps}>
      {icon}
      {label ?? children}
      <TabBadge {...badgeProps} />
    </Container>
  );
});
