import {forwardRef, MouseEventHandler} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import {TabBadge} from '../TabBadge';
import {TabProps} from '../types';

const Container = styled.div<Pick<TabProps, 'disabled'>>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  user-select: none;
  cursor: pointer;

  ${theme.typography.p1}

  ${props => {
    if (props.disabled) {
      return {
        color: theme.colors.grey[40],
      };
    }

    return {
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

  const onClickCapture: MouseEventHandler<HTMLDivElement> = e => {
    if (disabled) {
      e.stopPropagation();
    }

    rest.onClickCapture?.(e);
  };

  const containerProps = {
    ...rest,

    disabled,
    onClickCapture,

    'data-tab': value,
  };

  const badgeProps = {badge, disabled};

  return (
    <Container ref={ref} {...containerProps}>
      {icon}
      {label ?? children}
      <TabBadge {...badgeProps} />
    </Container>
  );
});
