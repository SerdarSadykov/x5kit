import styled from '@emotion/styled';

import {theme} from 'theme';

import type {SidebarMenuItemProps, SidebarMenuItemStyles} from 'SidebarMenu/types';

const Container = styled.div<SidebarMenuItemStyles>`
  display: flex;
  align-items: center;
  gap: 8px;

  ${theme.typography.p1compact};

  color: ${({isSelected, disabled}) => {
    if (disabled) {
      return theme.colors.grey[40];
    }

    return isSelected ? theme.colors.accent[90] : theme.colors.grey[100];
  }};
`;

export const Left: React.FC<SidebarMenuItemStyles & Partial<SidebarMenuItemProps>> = ({label, ...styles}) => {
  return <Container {...styles}>{label}</Container>;
};
