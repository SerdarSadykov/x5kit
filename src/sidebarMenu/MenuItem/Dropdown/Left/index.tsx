import styled from '@emotion/styled';

import {theme} from 'theme';

import {SidebarMenuItemProps, SidebarMenuItemStyles} from 'sidebarMenu/types';

const Container = styled.div<SidebarMenuItemStyles>`
  display: flex;
  align-items: center;
  gap: 8px;

  color: ${({isSelected, disabled}) => {
    if (disabled) {
      return theme.colors.grey[40];
    }

    return isSelected ? theme.colors.accent[90] : theme.colors.grey[100];
  }};
`;

const Label = styled.div`
  padding: 0 4px 0 0;

  ${theme.typography.p1compact}
`;

export const Left: React.FC<SidebarMenuItemStyles & Partial<SidebarMenuItemProps>> = ({label, ...styles}) => {
  return (
    <Container {...styles}>
      <Label>{label}</Label>
    </Container>
  );
};
